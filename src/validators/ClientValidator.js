import RequestValidator from "./RequestValidator";
import ZodiacEnum from '../enums/ZodiacEnum'
import GenderEnum from '../enums/GenderEnum';
import FieldEnum from '../enums/FieldEnum';
const FieldTypesEnum = FieldEnum.getFieldsTypesEnum();

export default class ClientValidator extends RequestValidator{

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
        ClientValidator.validateField(req,{name:'firstName', type: FieldTypesEnum.STRING, min:0, max: 100, isRequired: true});
        ClientValidator.validateField(req,{name:'lastName', type: FieldTypesEnum.STRING, min:0, max: 100});
        ClientValidator.validateField(req,
            {name:'password', type: FieldTypesEnum.STRING, min:0, max: 100, isRequired: true});
        ClientValidator.validateField(req,{name:'zodiac', type: FieldTypesEnum.ENUM, options: [
                ZodiacEnum.getZodiacEnum().ARIES, ZodiacEnum.getZodiacEnum().TAURUS,
                ZodiacEnum.getZodiacEnum().GEMINI, ZodiacEnum.getZodiacEnum().CANCER,
                ZodiacEnum.getZodiacEnum().LEO, ZodiacEnum.getZodiacEnum().VIRGO, ZodiacEnum.getZodiacEnum().LIBRA,
                ZodiacEnum.getZodiacEnum().SCORPIO, ZodiacEnum.getZodiacEnum().SAGITTARIUS,
                ZodiacEnum.getZodiacEnum().CAPRICORN, ZodiacEnum.getZodiacEnum().AQUARIUS,
                ZodiacEnum.getZodiacEnum().PISCES]});
        ClientValidator.validateField(req,{name:'birthdate', type: FieldTypesEnum.DATE_ISO8601});
        ClientValidator.validateField(req,{name:'email', type: FieldTypesEnum.EMAIL, isRequired: true});
        ClientValidator.validateField(req,{name:'gender', type: FieldTypesEnum.ENUM, options: [
                GenderEnum.getGenderEnum().FEMININE, GenderEnum.getGenderEnum().MASCULINE,
                GenderEnum.getGenderEnum().NEUTER]});

        this.checkErrors(req.validationErrors());
    }
}
