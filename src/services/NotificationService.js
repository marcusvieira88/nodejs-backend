import InternalServerError from '../errors/InternalServerError';
import NotificationModel from '../models/NotificationSchema';

export default class NotificationService {

    static async getById(notificationId) {
        return NotificationModel.findOne({_id: notificationId, deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getByReceiverId(receiverId) {
        return NotificationModel.findOne({receiverId: receiverId, deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getAllUnreadByReceiverId(receiverId) {
        return NotificationModel.find({receiverId: receiverId, readAt:{$exists: false} ,deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async create(notification) {
        let newNotification = new NotificationModel(notification);
        return newNotification.save()
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async update(notification) {
        return NotificationModel.findOneAndUpdate(
            {_id: notification.id, deleted_at:{$exists: false}},
            notification, {new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async updateToRead(receiverId, notificationId) {
        return NotificationModel.findOneAndUpdate(
            {_id:notificationId, receiverId: receiverId, deleted_at:{$exists: false}},
            {$set:{readAt:new Date()}},{new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async deleteById(notificationId) {
        return NotificationModel.findOneAndUpdate(
            {_id: notificationId, deleted_at:{$exists: false}},
            {$set:{deleted_at:new Date()}},{new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };
}

