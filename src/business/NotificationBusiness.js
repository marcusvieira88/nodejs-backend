import NotificationService from "../services/NotificationService";

export default class NotificationBusiness {

    static async getById(notificationId) {
        return await NotificationService.getById(notificationId);
    };

    static async getByReceiverId(receiverId) {
        return await NotificationService.getByReceiverId(receiverId);
    };

    static async getAllUnreadByReceiverId(receiverId) {
        return await NotificationService.getAllUnreadByReceiverId(receiverId);
    };

    static async create(notification) {
        return await NotificationService.create(notification);
    };

    static async updateToRead(receiverId, notificationId) {
        return await NotificationService.updateToRead(receiverId, notificationId);
    };

    static async update(notification) {
        return await NotificationService.update(notification);
    };

    static async deleteById(notificationId) {
        return await NotificationService.deleteById(notificationId);
    };
}

