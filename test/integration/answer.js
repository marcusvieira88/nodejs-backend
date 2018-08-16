import AnswerDataBuilder from "../builders/AnswerDataBuilder";
import AnswerValidator from "../validators/AnswerValidator";
import superTest from "supertest";
const assert = require('chai').assert;
const server = superTest.agent(`http://localhost:${process.env.SERVER_PORT}`);
//test variables
let requestData = AnswerDataBuilder.create();
let answerData = null;

describe('Integration Tests - Answer', function () {

    it('should create a answer', function (done) {
        server
            .post('/answers')
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                AnswerValidator.check(res.body.data, requestData.body);
                answerData = res.body.data;
                done();
            });
    }).timeout(10000);

    it('should get a answer by id', function (done) {
        server
            .get(`/answers/${answerData.id}`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                AnswerValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should update a answer', function (done) {
        requestData = AnswerDataBuilder.update(answerData.id);
        server
            .put(`/answers/${answerData.id}`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), answerData.id, `Id should have been ${answerData.id}`);
                AnswerValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should delete a answer', function (done) {
        server
            .delete(`/answers/${answerData.id}`)
            .set('Authorization', 'Bearer ' + global.freshUserToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), answerData.id, `Id should have been ${answerData.id}`);
                AnswerValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);
});