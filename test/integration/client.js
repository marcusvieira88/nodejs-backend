import ClientDataBuilder from "../builders/ClientDataBuilder";
import ClientValidator from "../validators/ClientValidator";
import UserValidator from "../validators/UserValidator";
import UserEnum from "../../src/enums/UserEnum";
import LoginDataBuilder from "../builders/LoginDataBuilder";
import QuestionValidator from "../validators/QuestionValidator";
import QuestionDataBuilder from "../builders/QuestionDataBuilder";
import UserDataBuilder from "../builders/UserDataBuilder";
import superTest from "supertest";
const server = superTest.agent(`http://localhost:${process.env.SERVER_PORT}`);
const assert = require('chai').assert;
//test variables
let requestData = ClientDataBuilder.create();
let clientData = null;
let userData = null;

describe('Integration Tests - Client', function () {

    it('should register a client', function (done) {
        server
            .post('/clients/registration/')
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                UserValidator.check(res.body.data.client, requestData.body);
                clientData = res.body.data.client;
                clientData.password = requestData.body.password;
                done();
            });
    }).timeout(10000);

    it('should authenticate a client', function (done) {
        const loginData = LoginDataBuilder.create(UserEnum.getTypesEnum().CLIENT,
            clientData.email, clientData.password);
        server
            .post('/authenticate/')
            .send(loginData)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.notEqual(res.body.data, undefined, 'The token should have been !== null');
                assert.notEqual(res.body.data.token, undefined, 'The token should have been !== undefined');
                global.freshClientToken = res.body.data.token;
                done();
            });
    }).timeout(10000);

    it('should get a client by id', function (done) {
        server
            .get(`/clients/${clientData.id}`)
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                ClientValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should register a user', function (done) {
        const reqCreateUser = UserDataBuilder.create();
        server
            .post('/users/registration/')
            .send(reqCreateUser.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                UserValidator.check(res.body.data.user, reqCreateUser.body);
                userData = res.body.data.user;
                done();
            });
    }).timeout(10000);

    it('should create a question', function (done) {
        const reqCreateQuestion = QuestionDataBuilder.create();
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

    it('should get questions by client id and expert id', function (done) {
        server
            .get(`/clients/${clientData.id}/expert/${userData.id}/questions`)
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

    it('should update a client', function (done) {
        requestData = ClientDataBuilder.update(clientData.id);
        server
            .put(`/clients/${clientData.id}`)
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), clientData.id, `Id should have been ${clientData.id}`);
                ClientValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should delete a client', function (done) {
        server
            .delete(`/clients/${clientData.id}`)
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), clientData.id, `Id should have been ${clientData.id}`);
                ClientValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);
});

