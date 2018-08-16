import mongoose from 'mongoose';
mongoose.plugin(require('@meanie/mongoose-to-json'));
import ZodiacEnum from "../enums/ZodiacEnum";
import GenderEnum from "../enums/GenderEnum";

// Define the database model
const ClientSchema = new mongoose.Schema({
        firstName: {
            type: String,
            maxlength: 100,
            minlength: 0
        },
        lastName: {
            type: String,
            maxlength: 100,
            minlength: 0
        },
        password:{
            type: String,
            maxlength: 100,
            minlength: 0,
            required: true
        },
        zodiac: {
            type: String,
            enum: [
                ZodiacEnum.getZodiacEnum().ARIES,
                ZodiacEnum.getZodiacEnum().TAURUS,
                ZodiacEnum.getZodiacEnum().GEMINI,
                ZodiacEnum.getZodiacEnum().CANCER,
                ZodiacEnum.getZodiacEnum().LEO,
                ZodiacEnum.getZodiacEnum().VIRGO,
                ZodiacEnum.getZodiacEnum().LIBRA,
                ZodiacEnum.getZodiacEnum().SCORPIO,
                ZodiacEnum.getZodiacEnum().SAGITTARIUS,
                ZodiacEnum.getZodiacEnum().CAPRICORN,
                ZodiacEnum.getZodiacEnum().AQUARIUS,
                ZodiacEnum.getZodiacEnum().PISCES
            ]
        },
        birthdate: {
            type: Date
        },
        email:{
            type: String,
            maxlength: 100,
            minlength: 0,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            enum: [
                GenderEnum.getGenderEnum().FEMININE,
                GenderEnum.getGenderEnum().MASCULINE,
                GenderEnum.getGenderEnum().NEUTER
            ]
        },
        deleted_at: {
            type: Date
        }
    },
    {
        timestamps: true //generate the createAt and updateAt
    }
);

ClientSchema.index({email: 1, deleted_at: 1});

module.exports = mongoose.model('Client', ClientSchema);