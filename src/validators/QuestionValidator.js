import RequestValidator from "./RequestValidator";
import QuestionEnum from '../enums/QuestionEnum';
import FieldEnum from '../enums/FieldEnum';
const FieldTypesEnum = FieldEnum.getFieldsTypesEnum();

export default class QuestionValidator extends RequestValidator{

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
        QuestionValidator.validateField(req,{name:'clientId', type: FieldTypesEnum.OBJECT_ID, required: true});
        QuestionValidator.validateField(req,{name:'userId', type: FieldTypesEnum.OBJECT_ID, required: true});
        QuestionValidator.validateField(req,
            {name:'content', type:FieldTypesEnum.STRING, min:0, max: 300, isRequired: true});
        QuestionValidator.validateField(req,{name:'status', type:FieldTypesEnum.ENUM, options: [
                QuestionEnum.getStatusEnum().OPEN, QuestionEnum.getStatusEnum().ANSWERED]});
        QuestionValidator.validateField(req,{name:'answerId', type: FieldTypesEnum.OBJECT_ID, required: true});

        this.checkErrors(req.validationErrors());
    }
}
