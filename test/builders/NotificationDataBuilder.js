import faker from "faker";
import mongoose from "mongoose";
import UserEnum from "../../src/enums/UserEnum";

export default class NotificationDataBuilder {

    static create() {
        return NotificationDataBuilder.generateBody();
    }

    static update(notificationId) {
        let notification = NotificationDataBuilder.generateBody();
        notification.id = notificationId;
        return notification;
    }

    static generateBody() {
        return {
            'receiverId': mongoose.Types.ObjectId(),
            'receiverType': faker.random.arrayElement([
                UserEnum.getTypesEnum().USER,
                UserEnum.getTypesEnum().CLIENT]),
            'text': faker.random.alphaNumeric(200)
        }
    }
};
