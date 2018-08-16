const assert = require('chai').assert;

export default class NotificationValidator {

    static check(resultData, requestData) {
        assert.equal(resultData.receiverId, requestData.receiverId.toString(), `ReceiverId should have been ${requestData.receiverId.toString()}`);
        assert.equal(resultData.receiverType, requestData.receiverType, `ReceiverType should have been ${requestData.receiverType}`);
        assert.equal(resultData.text, requestData.text, `Text should have been ${requestData.text}`);
    }
};
