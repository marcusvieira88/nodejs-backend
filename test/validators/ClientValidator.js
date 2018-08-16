import moment from 'moment';
import Helpers from '../../src/utils/Helpers';
const assert = require('chai').assert;

export default class ClientValidator {

    static check(resultData, requestData) {
        assert.equal(resultData.firstName, requestData.firstName, `First Name should have been ${requestData.firstName}`);
        assert.equal(resultData.lastName, requestData.lastName, `Last Name should have been ${requestData.lastName}`);
        assert.equal(resultData.email, requestData.email, `Email should have been ${requestData.email}`);
        assert.isOk(Helpers.compareHash(resultData.password, requestData.password), `Password should have been hash of ${requestData.password}`);
        assert.equal(resultData.zodiac, requestData.zodiac, `Zodiac should have been ${requestData.zodiac}`);
        assert.equal(moment(resultData.birthdate).toISOString(), requestData.birthdate, `BirthDate should have been ${requestData.birthdate}`);
        assert.equal(resultData.gender, requestData.gender, `Gender should have been ${requestData.gender}`);
    }
};
