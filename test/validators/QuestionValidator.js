const assert = require('chai').assert;

export default class QuestionValidator {

    static check(resultData, requestData) {
        assert.equal(resultData.clientId.toString(), requestData.clientId.toString(), `ClientId should have been ${requestData.clientId.toString()}`);
        assert.equal(resultData.userId, requestData.userId.toString(), `UserId should have been ${requestData.userId.toString()}`);
        assert.equal(resultData.content, requestData.content, `Content should have been ${requestData.content}`);
        assert.equal(resultData.status, requestData.status, `Status should have been ${requestData.status}`);

        if(requestData.answerId) {
            //used when the answer object is populated bby mongoose
            if(resultData.answerId && resultData.answerId.content){
                assert.equal(resultData.answerId._id.toString(), requestData.answerId.toString(),
                    `AnswerId should have been ${requestData.answerId.toString()}`);
            }else {
                assert.equal(resultData.answerId.toString(), requestData.answerId.toString(),
                    `AnswerId should have been ${requestData.answerId.toString()}`);
            }
        }
    }
};
