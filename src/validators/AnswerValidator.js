import RequestValidator from "./RequestValidator";
import FieldEnum from '../enums/FieldEnum';
const FieldTypesEnum = FieldEnum.getFieldsTypesEnum();

export default class AnswerValidator extends RequestValidator{

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
        AnswerValidator.validateField(req,{name:'userId', type: FieldTypesEnum.OBJECT_ID, isRequired: true});
        AnswerValidator.validateField(req,{name:'clientId', type: FieldTypesEnum.OBJECT_ID, isRequired: true});
        AnswerValidator.validateField(req,
            {name:'content', type: FieldTypesEnum.STRING, min:0, max: 300, isRequired: true});
        AnswerValidator.validateField(req,{name:'questionId', type: FieldTypesEnum.OBJECT_ID});

        this.checkErrors(req.validationErrors());
    }
}
