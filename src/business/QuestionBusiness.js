import QuestionService from "../services/QuestionService";
import NotificationService from "../services/NotificationService";
import WebSocketService from "../../bin/WebSocketService"
import ClientService from "../services/ClientService";
import Helpers from "../utils/Helpers";

export default class QuestionBusiness {

    static async getById(questionId) {
        return await QuestionService.getById(questionId);
    };

    static async create(req) {
        const question = await QuestionService.create(req);
        //create the notification
        const client = await ClientService.getById(question.clientId);
        if(question && client) {
            const notification = Helpers.createQuestionNotification(question.userId, client);
            await NotificationService.create(notification);
            await WebSocketService.sendNotificationToSocket(notification);
        }
        return question;
    };

    static async update(req) {
        return await QuestionService.update(req);
    };

    static async deleteById(questionId) {
        return await QuestionService.deleteById(questionId);
    };
}

