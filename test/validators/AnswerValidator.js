const assert = require('chai').assert;

export default class AnswerValidator {

    static check(resultData, requestData) {
        assert.equal(resultData.userId, requestData.userId.toString(), `UserId should have been ${requestData.userId.toString()}`);
        assert.equal(resultData.clientId, requestData.clientId.toString(), `ClientId should have been ${requestData.clientId.toString()}`);
        assert.equal(resultData.content, requestData.content, `Content should have been ${requestData.content}`);
        assert.equal(resultData.questionId, requestData.questionId.toString(), `QuestionId should have been ${requestData.questionId.toString()}`);
    }
};
