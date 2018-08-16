import InternalServerError from '../errors/InternalServerError';
import ClientModel from '../models/ClientSchema';
import Helpers from "../utils/Helpers";

export default class ClientService {

    static async getById(clientId) {
        return ClientModel.findOne({_id: clientId, deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getByEmail(email) {
        return ClientModel.findOne({email: email})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async create(req) {
        const newClient = new ClientModel(ClientService.initialize(req));
        return newClient.save()
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async update(req) {
        const updateClient = ClientService.initialize(req);
        return ClientModel.findOneAndUpdate(
            {_id: req.params.id, deleted_at:{$exists: false}},
            updateClient, {new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async deleteById(clientId) {
        return ClientModel.findOneAndUpdate(
            {_id: clientId, deleted_at:{$exists: false}},
            {$set:{deleted_at:new Date()}},{new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static initialize(req){
        return {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: Helpers.generateHash(req.body.password),
            zodiac: req.body.zodiac,
            birthdate: req.body.birthdate,
            email: req.body.email,
            gender: req.body.gender
        };
    }
}

