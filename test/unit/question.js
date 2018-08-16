import QuestionDataBuilder from "../builders/QuestionDataBuilder";
import QuestionValidator from "../validators/QuestionValidator";
import QuestionService from '../../src/services/QuestionService';
import QuestionEnum from '../../src/enums/QuestionEnum';
import AnswerService from "../../src/services/AnswerService";
import AnswerValidator from "../validators/AnswerValidator";
import AnswerDataBuilder from "../builders/AnswerDataBuilder";
const assert = require('chai').assert;
//test variables
let requestData = QuestionDataBuilder.create();
let questionData = null;
let answerData = null;

describe('Unit Tests - Question', async function () {

    it('should create a question', async () => {
        const question = await QuestionService.create(requestData);
        QuestionValidator.check(question, requestData.body);
        questionData = question;
    }).timeout(10000);

    it('should get a question by id', async () => {
        const question = await QuestionService.getById(questionData._id);
        assert.equal(question._id.toString(), questionData._id, `Id should have been ${questionData._id}`);
        QuestionValidator.check(question, requestData.body);
    }).timeout(10000);

    it('should update a question to answered', async () => {
        const question = await QuestionService.updateToAnswered(questionData._id);
        assert.equal(question._id.toString(), questionData._id.toString(), `Id should have been ${questionData._id.toString()}`);
        assert.equal(question.status, QuestionEnum.getStatusEnum().ANSWERED, `Status should have been ${QuestionEnum.getStatusEnum().ANSWERED}`);
    }).timeout(10000);

    it('should create a answer for a question', async () => {
        const requestAnswer = AnswerDataBuilder.create();
        const answer = await AnswerService.create(requestAnswer);
        AnswerValidator.check(answer, requestAnswer.body);
        answerData = answer;
    }).timeout(10000);

    it('should update a question', async () => {
        requestData = QuestionDataBuilder.update(questionData._id);
        requestData.body.answerId = answerData._id;
        const question = await QuestionService.update(requestData);
        assert.equal(question._id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id.toString()}`);
        QuestionValidator.check(question, requestData.body);
        questionData = question;
    }).timeout(10000);

    it('should get a question by clientId and expertId', async () => {
        const questions = await QuestionService.getAllByClientIdAndExpertId(questionData.clientId, questionData.userId);
        assert.equal(questions[0]._id.toString(), questionData._id.toString(), `Id should have been ${questionData._id.toString()}`);
        QuestionValidator.check(questions[0]._doc, requestData.body);
    }).timeout(10000);

    it('should delete a question', async () => {
        const question = await QuestionService.deleteById(questionData._id);
        assert.equal(question._id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        QuestionValidator.check(question, requestData.body);
    }).timeout(10000);
});