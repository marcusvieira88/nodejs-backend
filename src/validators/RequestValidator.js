import ApplicationError from "../errors/ApplicationError";
import ValidationError from "../errors/ValidationError";
import ErrorEnum from '../enums/ErrorEnum';
import FieldEnum from '../enums/FieldEnum';
const ErrorTypesEnum = ErrorEnum.getErrorTypesEnum();
const FieldTypesEnum = FieldEnum.getFieldsTypesEnum();

export default class RequestValidator{

  constructor() {
      if (new.target === RequestValidator) {
            throw new TypeError(`Cannot construct AbstractList directly.
                You need to extend this class.`);
            }
  }

  /**
   * Responsible for validate the body information
   * @param req - request
   */
  validateBody(req){
      throw new TypeError("Do not call abstract method validateBody from child.");
  }

    /**
    * Responsible for validate the params ids (MongoDB id type)
    * @param req - request
    * @param idNames - names of ids fields that will be validate
    */
    validateIds(req, ...idNames){
        idNames.forEach(idName => {
            const fieldData = {name: idName, type: FieldTypesEnum.OBJECT_ID, isRequired: true};
            req.checkParams(idName).optional().isMongoId()
                .withMessage({type: ErrorTypesEnum.INVALID_ID, data: fieldData});
        });
        this.checkErrors(req.validationErrors());
    }

    /**
    * Responsible for validate the body and the param id
    * @param req - request
    * @param fieldName - name of id field that will be validate
    */
    validateBodyAndId(req, fieldName = "id"){
        const fieldData = {name: fieldName, type: FieldTypesEnum.OBJECT_ID, isRequired: true};
        req.checkParams(fieldName).optional().isMongoId()
          .withMessage({type: ErrorTypesEnum.INVALID_ID, data: fieldData});
        this.validateBody(req);
    }

    /**
    * Validate the field based in the parameters
    *  if there are errors the req will be populate with them
    * @param req - request
    * @param fieldData - information about filed constraints
    *  - name: name of field in the body request
    *  - type: type of field(FieldsEnum)
    *  - min: min value (optional)
    *  - max: max value (optional)
    *  - isRequired: TRUE if the field is required (optional)
    *  - options: options of ENUM type (only the field is enum)
    */
    static validateField(req, fieldData) {

        if(fieldData.isRequired) {
            req.checkBody(fieldData.name).notEmpty()
                .withMessage({type: ErrorTypesEnum.REQUIRED_FIELD, data: fieldData});
        }

        switch (fieldData.type) {
        case FieldTypesEnum.STRING:
            req.checkBody(fieldData.name)
              .optional().isString()
                .withMessage({type: ErrorTypesEnum.INVALID_STRING, data: fieldData})
              .optional().isLength({min: fieldData.min, max: fieldData.max})
                .withMessage({type: ErrorTypesEnum.INVALID_LENGTH, data: fieldData});
            break;

        case FieldTypesEnum.ENUM:
            req.checkBody(fieldData.name)
              .optional().isValidEnum(fieldData.options)
                .withMessage({type: ErrorTypesEnum.INVALID_ENUM, data: fieldData});
            break;

        case FieldTypesEnum.BOOLEAN:
            req.checkBody(fieldData.name)
              .optional().isBoolean()
                .withMessage({type: ErrorTypesEnum.INVALID_BOOLEAN, data: fieldData});
            break;

        case FieldTypesEnum.DATE:
            req.checkBody(fieldData.name)
              .optional().isValidDateISO_8601()
                .withMessage({type: ErrorTypesEnum.INVALID_DATE, data: fieldData});
            break;

        case FieldTypesEnum.URL:
            req.checkBody(fieldData.name)
              .optional().isURL().withMessage({type: ErrorTypesEnum.INVALID_URL, data: fieldData})
              .optional().isLength({min: fieldData.min, max: fieldData.max})
                .withMessage({type: ErrorTypesEnum.INVALID_LENGTH, data: fieldData});
            break;

        case FieldTypesEnum.EMAIL:
            req.checkBody(fieldData.name)
              .optional().isEmail().withMessage({type: ErrorTypesEnum.INVALID_EMAIL, data: fieldData})
              .optional().isLength({min: fieldData.min, max: fieldData.max})
                .withMessage({type: ErrorTypesEnum.INVALID_LENGTH, data: fieldData});
            break;

        case FieldTypesEnum.OBJECT_ID:
            req.checkBody(fieldData.name)
              .optional().isMongoId().withMessage({type: ErrorTypesEnum.INVALID_ID, data: fieldData});
            break;
        default:
            new Error("Field type not implemented");
            break;
        }
    }

    /**
    * Check validation errors
    * If there are errors, build a errors message with ApplicationErrors
    * @param errors - list os validation errors
    * @return throw ValidationError if there are validation problems
    */
    checkErrors(errors){
        if(errors){
              let formatErrors = [];
                errors.forEach((err)=>{
                  formatErrors.push(new ApplicationError(err.msg.type, err.msg.data));
              });
              throw new ValidationError('Validation Error', formatErrors);
        }
    }
}
