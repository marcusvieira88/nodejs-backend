import UserDataBuilder from "../builders/UserDataBuilder";
import UserValidator from "../validators/UserValidator";
import UserService from '../../src/services/UserService';
const assert = require('chai').assert;
//test variables
let requestData = UserDataBuilder.create();
let userData = null;

describe('Unit Tests - User', async function () {

    it('should create a user', async () => {
        const user = await UserService.create(requestData);
        UserValidator.check(user, requestData.body);
        userData = user;
    }).timeout(10000);

    it('should get a user by id', async () => {
        const user = await UserService.getById(userData.id);
        assert.equal(user.id.toString(), userData.id, `Id should have been ${userData.id}`);
        UserValidator.check(user, requestData.body);
    }).timeout(10000);

    it('should get a user by memberNo', async () => {
        const user = await UserService.getByMemberNo(userData.memberNo);
        assert.equal(user.memberNo.toString(), userData.memberNo, `MemberNo should have been ${userData.memberNo}`);
        UserValidator.check(user, requestData.body);
    }).timeout(10000);

    it('should get a all users', async () => {
        const users = await UserService.getAll(userData.id);
        assert.notEqual(users, null, 'The users list should have been !== null');
        assert.notEqual(users, undefined, 'The users list should have been !== undefined');
    }).timeout(10000);

    it('should update a user', async () => {
        requestData = UserDataBuilder.update(userData.id);
        const user = await UserService.update(requestData);
        assert.equal(user.id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        UserValidator.check(user, requestData.body);
    }).timeout(10000);

    it('should delete a user', async () => {
        const user = await UserService.deleteById(userData.id);
        assert.equal(user.id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        UserValidator.check(user, requestData.body);
    }).timeout(10000);
});