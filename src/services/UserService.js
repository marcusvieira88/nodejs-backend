import InternalServerError from '../errors/InternalServerError';
import Helpers from '../utils/Helpers';
import UserModel from '../models/UserSchema';

export default class UserService {

    static async getById(answerId) {
        return UserModel.findOne({_id: answerId, deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getByMemberNo(memberNo) {
        return UserModel.findOne({memberNo: memberNo})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getAll() {
        return UserModel.find({deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async create(req) {
        let newUser = new UserModel(UserService.initialize(req));
        return newUser.save()
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async update(req) {
        const updateUser = UserService.initialize(req);
        return UserModel.findOneAndUpdate(
            {_id: req.params.id, deleted_at:{$exists: false}},
            updateUser, {new: 'true', context: 'query',})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async deleteById(answerId) {
        return UserModel.findOneAndUpdate(
            {_id: answerId, deleted_at:{$exists: false}},
            {$set:{deleted_at:new Date()}},{new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static initialize(req){
        return {
            memberNo: req.body.memberNo,
            name: req.body.name,
            password: Helpers.generateHash(req.body.password),
            emails: req.body.email,
        };
    }
}

