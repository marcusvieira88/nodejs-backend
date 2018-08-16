import RequestValidator from "./RequestValidator";
import FieldEnum from '../enums/FieldEnum';
import UserEnum from "../enums/UserEnum";
const FieldTypesEnum = FieldEnum.getFieldsTypesEnum();

export default class AuthenticateValidator extends RequestValidator{

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
        AuthenticateValidator.validateField(req,{name:'type', type: FieldTypesEnum.ENUM, options: [
                UserEnum.getTypesEnum().USER, UserEnum.getTypesEnum().CLIENT], isRequired: true});
        AuthenticateValidator.validateField(req,
            {name:'password', type: FieldTypesEnum.STRING, min:0, max: 100, isRequired: true});

        if(req.body.type && req.body.type === UserEnum.getTypesEnum().USER){
            AuthenticateValidator.validateField(req,
                {name:'userId', type: FieldTypesEnum.STRING, min: 0, max: 50, isRequired: true});
        }else{
            AuthenticateValidator.validateField(req,{name:'userId', type: FieldTypesEnum.EMAIL, isRequired: true});
        }

        this.checkErrors(req.validationErrors());
    }
}

