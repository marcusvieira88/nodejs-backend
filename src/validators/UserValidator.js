import RequestValidator from "./RequestValidator";
const FieldTypesEnum = require('../enums/FieldEnum').getFieldsTypesEnum();

export default class UserValidator extends RequestValidator{

    /**
     * For validate the field, please fill this options:
     * name: name of field in the body request
     * type: type of field(FieldsEnum)
     * min: min value (optional)
     * max: max value (optional)
     * isRequired: TRUE if the field is required (optional)
     * options: options of ENUM type (only for field type enum)
     */
    validateBody(req){

        UserValidator.validateField(req,
            {name:'memberNo', type: FieldTypesEnum.STRING, min: 0, max: 50, isRequired: true});
        UserValidator.validateField(req,{name:'name', type: FieldTypesEnum.STRING, min: 0, max: 100, isRequired: true});
        UserValidator.validateField(req,
            {name:'password', type: FieldTypesEnum.STRING, min:0, max: 100, isRequired: true});
        UserValidator.validateField(req,{name:'email', type: FieldTypesEnum.EMAIL, min:0, max: 100});

        this.checkErrors(req.validationErrors());
    }
}
