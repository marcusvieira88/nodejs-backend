import Helpers from "../../src/utils/Helpers";

const assert = require('chai').assert;

export default class UserValidator {

    static check(resultData, requestData) {
        assert.equal(resultData.memberNo, requestData.memberNo, `MemberNo should have been ${requestData.memberNo}`);
        assert.equal(resultData.name, requestData.name, `Name should have been ${requestData.name}`);
        assert.isOk(Helpers.compareHash(resultData.password, requestData.password), `Password should have been hash of ${requestData.password}`);
        assert.equal(requestData.email, requestData.email, `Email should have been ${requestData.email}`);
    }
};
