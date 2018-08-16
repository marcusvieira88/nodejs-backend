import moment from 'moment';
import faker from "faker";
import ZodiacEnum from "../../src/enums/ZodiacEnum";
import GenderEnum from "../../src/enums/GenderEnum";

export default class ClientDataBuilder {

    static create() {
        return {
            body: ClientDataBuilder.generateBody()
        };
    }

    static update(clientId) {
        return {
            params: {
                id: clientId
            },
            body: ClientDataBuilder.generateBody()
        };
    }

    static generateBody() {
        return {
            'firstName': faker.name.firstName(),
            'lastName': faker.name.lastName(),
            'password': faker.random.alphaNumeric(20),
            'zodiac': faker.random.arrayElement([ZodiacEnum.getZodiacEnum().ARIES,
                ZodiacEnum.getZodiacEnum().TAURUS, ZodiacEnum.getZodiacEnum().GEMINI,
                ZodiacEnum.getZodiacEnum().CANCER, ZodiacEnum.getZodiacEnum().LEO,
                ZodiacEnum.getZodiacEnum().VIRGO, ZodiacEnum.getZodiacEnum().LIBRA,
                ZodiacEnum.getZodiacEnum().SCORPIO, ZodiacEnum.getZodiacEnum().SAGITTARIUS,
                ZodiacEnum.getZodiacEnum().CAPRICORN, ZodiacEnum.getZodiacEnum().AQUARIUS,
                ZodiacEnum.getZodiacEnum().PISCES]),
            'birthdate': moment().hours(0).minutes(0).seconds(0).millisecond(0).toISOString(),
            'email': faker.internet.email(),
            'gender': faker.random.arrayElement([GenderEnum.getGenderEnum().FEMININE,
                GenderEnum.getGenderEnum().MASCULINE, GenderEnum.getGenderEnum().NEUTER]),
        }
    }
};
