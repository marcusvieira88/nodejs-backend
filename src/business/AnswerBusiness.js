import AnswerService from "../services/AnswerService";
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import NotificationService from "../services/NotificationService";
import WebSocketService from "../../bin/WebSocketService"
import Helpers from "../utils/Helpers";

export default class AnswerBusiness {

    static async getById(answerId) {
        return await AnswerService.getById(answerId);
    };

    static async create(req) {
        const answer = await AnswerService.create(req);
        if(answer) {
            await QuestionService.updateToAnswered(answer.questionId, answer._id);
            const user = await UserService.getById(answer.userId);
            if (user) {
                const notification = Helpers.createAnswerNotification(answer.clientId, user);
                await NotificationService.create(notification);
                await WebSocketService.sendNotificationToSocket(notification);
            }
        }
        return answer;
    };

    static async update(req) {
        return await AnswerService.update(req);
    };

    static async deleteById(answerId) {
        return await AnswerService.deleteById(answerId);
    };
}

