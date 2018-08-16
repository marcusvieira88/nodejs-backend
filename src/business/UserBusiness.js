import UserService from "../services/UserService";
import QuestionService from "../services/QuestionService";
import ValidationError from "../errors/ValidationError";
import Helpers from "../utils/Helpers";

export default class UserBusiness {

    static async getById(userId) {
        return await UserService.getById(userId);
    };

    static async getAll() {
        return await UserService.getAll();
    };

    static async getAllQuestionsByClientIdAndExpertId(clientId, userId) {
        return await QuestionService.getAllByClientIdAndExpertId(clientId, userId);
    };

    static async getAllClientsWithQuestion(userId) {
        return await QuestionService.getAllClientsWithQuestion(userId);
    };

    static async create(req) {
        const user = await UserService.getByMemberNo(req.body.memberNo);
        if(user){
            throw new ValidationError('User is already registered.', user)
        }
        const newUser = await UserService.create(req);
        return {
            user: newUser,
            token: Helpers.generateToken(req.body.type,newUser._id)
        }
    };

    static async update(req) {
        return await UserService.update(req);
    };

    static async deleteById(userId) {
        return await UserService.deleteById(userId);
    };
}

