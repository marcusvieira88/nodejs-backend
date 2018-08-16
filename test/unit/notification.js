import NotificationDataBuilder from "../builders/NotificationDataBuilder";
import NotificationValidator from "../validators/NotificationValidator";
import NotificationService from '../../src/services/NotificationService';
const assert = require('chai').assert;
//test variables
let requestData = NotificationDataBuilder.create();
let notificationData = null;

describe('Unit Tests - Notification', async function () {

    it('should create a notification', async () => {
        const notification = await NotificationService.create(requestData);
        NotificationValidator.check(notification, requestData);
        notificationData = notification;
    }).timeout(10000);

    it('should get a notification by id', async () => {
        const notification = await NotificationService.getById(notificationData.id);
        assert.equal(notification.id.toString(), notificationData.id, `Id should have been ${notificationData.id}`);
        NotificationValidator.check(notification, requestData);
    }).timeout(10000);

    it('should get a notification by receiverId', async () => {
        const notification = await NotificationService.getByReceiverId(notificationData.receiverId);
        assert.equal(notification.id.toString(), notificationData.id, `Id should have been ${notificationData.id}`);
        NotificationValidator.check(notification, requestData);
    }).timeout(10000);

    it('should get a unread notification by receiverId', async () => {
        const notifications = await NotificationService.getAllUnreadByReceiverId(notificationData.receiverId);
        assert.equal(notifications[0]._id.toString(), notificationData.id, `Id should have been ${notificationData.id}`);
        assert.equal(notifications[0].readAt, undefined, 'ReadAt should have been === undefined');
        NotificationValidator.check(notifications[0], requestData);
    }).timeout(10000);

    it('should update notification to read', async () => {
        const notification = await NotificationService.updateToRead(notificationData.receiverId, notificationData.id);
        assert.equal(notification._id.toString(), notificationData.id, `Id should have been ${notificationData.id}`);
        assert.notEqual(notification.readAt, undefined, 'ReadAt should have been !== undefined');
    }).timeout(10000);

    it('should update a notification', async () => {
        requestData = NotificationDataBuilder.update(notificationData.id);
        const notification = await NotificationService.update(requestData);
        assert.equal(notification.id.toString(), requestData.id.toString(), `Id should have been ${requestData.id}`);
        NotificationValidator.check(notification, requestData);
    }).timeout(10000);

    it('should delete a notification', async () => {
        const notification = await NotificationService.deleteById(notificationData.id);
        assert.equal(notification.id.toString(), requestData.id.toString(), `Id should have been ${requestData.id}`);
        NotificationValidator.check(notification, requestData);
    }).timeout(10000);
});