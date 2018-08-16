import QuestionDataBuilder from "../builders/QuestionDataBuilder";
import QuestionValidator from "../validators/QuestionValidator";
import superTest from "supertest";
const assert = require('chai').assert;
const server = superTest.agent(`http://localhost:${process.env.SERVER_PORT}`);
//test variables
let requestData = QuestionDataBuilder.create();
let questionId = null;

describe('Integration Tests - Question', function () {

    it('should create a question', function (done) {
        server
            .post('/questions')
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                QuestionValidator.check(res.body.data, requestData.body);
                questionId = res.body.data.id;
                done();
            });
    }).timeout(10000);

    it('should get a question by id', function (done) {
        server
            .get(`/questions/${questionId}`)
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                QuestionValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should update a question', function (done) {
        requestData = QuestionDataBuilder.update(questionId);
        server
            .put(`/questions/${questionId}`)
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .send(requestData.body)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), questionId, `Id should have been ${questionId}`);
                QuestionValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);

    it('should delete a question', function (done) {
        server
            .delete(`/questions/${questionId}`)
            .set('Authorization', 'Bearer ' + global.freshClientToken)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                assert.equal(res.status, 200, `Status should have been ${200}`);
                assert.equal(res.body.data.id.toString(), questionId, `Id should have been ${questionId}`);
                QuestionValidator.check(res.body.data, requestData.body);
                done();
            });
    }).timeout(10000);
});