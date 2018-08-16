import AnswerDataBuilder from "../builders/AnswerDataBuilder";
import AnswerValidator from "../validators/AnswerValidator";
import AnswerService from '../../src/services/AnswerService';
const assert = require('chai').assert;
//test variables
let requestData = AnswerDataBuilder.create();
let answerId = null;

describe('Unit Tests - Answer', async function () {

    it('should create a answer', async () => {
        const answer = await AnswerService.create(requestData);
        AnswerValidator.check(answer, requestData.body);
        answerId = answer.id;
    }).timeout(10000);

    it('should get a answer by id', async () => {
        const answer = await AnswerService.getById(answerId);
        assert.equal(answer.id.toString(), answerId, `Id should have been ${answerId}`);
        AnswerValidator.check(answer, requestData.body);
    }).timeout(10000);

    it('should update a answer', async () => {
        requestData = AnswerDataBuilder.update(answerId);
        const answer = await AnswerService.update(requestData);
        assert.equal(answer.id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        AnswerValidator.check(answer, requestData.body);
    }).timeout(10000);

    it('should delete a answer', async () => {
        const answer = await AnswerService.deleteById(answerId);
        assert.equal(answer.id.toString(), requestData.params.id.toString(), `Id should have been ${requestData.params.id}`);
        AnswerValidator.check(answer, requestData.body);
    }).timeout(10000);
});