import NotificationBusiness from "../src/business/NotificationBusiness";
import logger from '../src/utils/Logger';
import cache from './cache';

let socketServer = null;

/**
 * Create a socket for handling the notifications.
 */
exports.createNotificationSocket = function (server) {

    const io = require('socket.io')(server);
    const socketIoJwt = require('socketio-jwt');

    // With socket.io < 1.0
    io.set('authorization', socketIoJwt.authorize({
        secret: process.env.JWT_SECRET,
        handshake: true
    }));

    //With socket.io >= 1.0
    io.use(socketIoJwt.authorize({
        secret: process.env.JWT_SECRET,
        handshake: true
    }));

    socketServer = io.sockets.on('connection',  (socket) => {
        const userId = getSocketUserId(socket);
        logger.info(`Socket connected to user ${userId}, ${socket.id}`);
        cache.writeRedisKey('socket_'+userId,socket.id);

        socket.on('get_store_notifications', async (data) => {
            await this.sendNotifications(socket);
        });

        socket.on('notification_read', async (data) => {
            //mark the notification as read
            await NotificationBusiness.updateToRead(data.receiverId, data.notificationId);
            logger.info(`Notifications id ${data.notificationId} of user id - ${data.receiverId} was read.`);
            await this.sendNotifications(socket);
        });
        return socket;
    });
};

exports.sendNotificationToSocket = async function (notification) {
    const socketId = await cache.readRedisKey('socket_'+ notification.receiverId.toString());
    socketServer.to(socketId).emit('new_notification', {data: notification});
    logger.info(`Notification sent to user ${notification.receiverId}.`);
};

exports.sendNotifications = async function (socket) {
    const userId = getSocketUserId(socket);
    const socketId = await cache.readRedisKey('socket_'+ userId.toString());
    const notifications = await NotificationBusiness.getAllUnreadByReceiverId(userId);
    socketServer.to(socketId).emit('initial_notifications', {data: notifications});
};

function getSocketUserId(socket) {
    let userId = '';
    if (socket && socket.handshake && socket.handshake.decoded_token
        && socket.handshake.decoded_token.userId) {
        userId = socket.handshake.decoded_token.userId;
    } else if (socket && socket.decoded_token && socket.decoded_token.userId) {
        userId = socket.decoded_token.userId;
    }
    return userId;
}

