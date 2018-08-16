import UserDataBuilder from "../builders/UserDataBuilder";
import LoginDataBuilder from "../builders/LoginDataBuilder";
import UserValidator from "../validators/UserValidator";
import UserEnum from "../../src/enums/UserEnum";
import superTest from "supertest";
import QuestionValidator from "../validators/QuestionValidator";
import ClientDataBuilder from "../builders/ClientDataBuilder";
import ClientValidator from "../validators/ClientValidator";
import QuestionDataBuilder from "../builders/QuestionDataBuilder";
const assert = require('chai').assert;
const server = superTest.agent(`http://localhost:${process.env.SERVER_PORT}`);
//test variables
let requestData = UserDataBuilder.create();
let userData = null;
let clientData = null;

describe('Integration Tests - User', function () {

    it('should register a user', function (done) {
        server
            .post('/users/registration/')
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                UserValidator.check(res.body.data.user, requestData.body);
                userData = res.body.data.user;
                userData.password = requestData.body.password.toString();
                done();
            });
    }).timeout(10000);

    it('should authenticate a user', function (done) {
        const loginData = LoginDataBuilder.create(UserEnum.getTypesEnum().USER,
            userData.memberNo, userData.password);
        server
            .post('/authenticate/')
            .send(loginData)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.notEqual(res.body.data, undefined, 'The token should have been !== null');
                assert.notEqual(res.body.data.token, undefined, 'The token should have been !== undefined');
                global.freshUserToken = res.body.data.token;
                done();
            });
    }).timeout(10000);

    it('should get a user by id', function (done) {
        server
            .get(`/users/${userData.id}`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                UserValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should register a client', function (done) {
        const reqCreateClient = ClientDataBuilder.create();
        server
            .post('/clients/registration/')
            .send(reqCreateClient.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                ClientValidator.check(res.body.data.client, reqCreateClient.body);
                clientData = res.body.data.client;
                done();
            });
    }).timeout(10000);

    it('should create a question', function (done) {
        let reqCreateQuestion = QuestionDataBuilder.create();
        reqCreateQuestion.body.clientId = clientData.id;
        reqCreateQuestion.body.userId = userData.id;
        server
            .post('/questions')
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .send(reqCreateQuestion.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                QuestionValidator.check(res.body.data, reqCreateQuestion.body);
                done();
            });
    }).timeout(10000);

    it('should get the clients that has question for this user', function (done) {
        server
            .get(`/users/${userData.id}/client/${clientData.id}/questions`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.notEqual(res.body.data, undefined, 'Question list should have been !== null');
                assert.notEqual(res.body.data, undefined, 'Question list should have been !== undefined');
                done();
            });
    }).timeout(10000);

    it('should update a user', function (done) {
        requestData = UserDataBuilder.update(userData.id);
        server
            .put(`/users/${userData.id}`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), userData.id, `Id should have been ${userData.id}`);
                UserValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should delete a user', function (done) {
        server
            .delete(`/users/${userData.id}`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), userData.id, `Id should have been ${userData.id}`);
                UserValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);
});