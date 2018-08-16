import InternalServerError from '../errors/InternalServerError';
import QuestionModel from '../models/QuestionSchema';
import QuestionEnum from '../enums/QuestionEnum';
import mongoose from "mongoose";

export default class QuestionService {

    static async getById(questionId) {
        return QuestionModel.findOne({_id: questionId, deleted_at:{$exists: false}})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getAllByClientIdAndExpertId(clientId, expertId) {
        return QuestionModel.find({clientId:clientId, userId:expertId, deleted_at:{$exists: false}})
            .populate('answerId')
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async getAllClientsWithQuestion(userId) {
        return QuestionModel.aggregate([
            {"$match":{userId:mongoose.Types.ObjectId(userId), deleted_at:{$exists: false}}},
            {"$lookup":{
                        from:"clients",
                        localField:"clientId",
                        foreignField:"_id",
                        as:"clients"
                    }
                },
            { $group : { _id : "$clientId",
                        firstName: {$first: {"$arrayElemAt":["$clients.firstName",0]}},
                        lastName: {$first:{"$arrayElemAt":["$clients.lastName",0]}}}}
        ])
    };

    static async create(req) {
        let newQuestion = new QuestionModel(QuestionService.initialize(req));
        return newQuestion.save()
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async update(req) {
        const updateQuestion = QuestionService.initialize(req);
        return QuestionModel.findOneAndUpdate(
            {_id: req.params.id, deleted_at:{$exists: false}},
            updateQuestion, {new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async updateToAnswered(questionId, answerId) {
        return QuestionModel.findOneAndUpdate(
            {_id: questionId, deleted_at:{$exists: false}},
            {$set: {status: QuestionEnum.getStatusEnum().ANSWERED}, answerId:answerId}, {new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static async deleteById(questionId) {
        return QuestionModel.findOneAndUpdate(
            {_id: questionId, deleted_at:{$exists: false}},
            {$set:{deleted_at:new Date()}},{new: 'true'})
            .catch((err)=>{
                throw new InternalServerError(`Database error: ${err}`);
            });
    };

    static initialize(req){
        return {
            clientId: req.body.clientId,
            userId: req.body.userId,
            content: req.body.content,
            status: req.body.status,
            answerId: req.body.answerId
        }
    }
}

