import ClientService from "../services/ClientService";
import QuestionService from "../services/QuestionService";
import ValidationError from "../errors/ValidationError";
import Helpers from "../utils/Helpers";

export default class ClientBusiness {

    static async getById(clientId) {
        return await ClientService.getById(clientId);
    };

    static async getAllQuestionsByClientIdAndExpertId(clientId, expertId) {
        return await QuestionService.getAllByClientIdAndExpertId(clientId, expertId);
    };

    static async create(req) {
        const client = await ClientService.getByEmail(req.body.email);
        if(client){
            throw new ValidationError('Client is already registered.', client)
        }
        const newClient = await ClientService.create(req);
        return {
            client: newClient,
            token: Helpers.generateToken(req.body.type,newClient._id)
        }
    };

    static async update(req) {
        return await ClientService.update(req);
    };

    static async deleteById(clientId) {
        return await ClientService.deleteById(clientId);
    };
}

