import InternalServerError from '../errors/InternalServerError';
import AnswerModel from '../models/AnswerSchema';

export default class AnswerService {

    static async getById(answerId) {
        return AnswerModel.findOne({_id: answerId, deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async create(req) {
        let newAnswer = new AnswerModel(AnswerService.initialize(req));
        return newAnswer.save()
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async update(req) {
        const updateAnswer = AnswerService.initialize(req);
        return AnswerModel.findOneAndUpdate(
            {_id: req.params.id, deleted_at:{$exists: false}},
            updateAnswer, {new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async deleteById(answerId) {
        return AnswerModel.findOneAndUpdate(
            {_id: answerId, deleted_at:{$exists: false}},
            {$set:{deleted_at:new Date()}},{new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static initialize(req){
        return {
            userId: req.body.userId,
            clientId: req.body.clientId,
            content: req.body.content,
            questionId: req.body.questionId
        };
    }
}

