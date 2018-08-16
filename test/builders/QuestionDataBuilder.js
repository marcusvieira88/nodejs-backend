import faker from "faker";
import mongoose from "mongoose";
import QuestionEnum from "../../src/enums/QuestionEnum"

export default class QuestionDataBuilder {

    static create() {
        return {
            body: QuestionDataBuilder.generateBody()
        };
    }

    static update(questionId) {
        return {
            params: {
                id: questionId
            },
            body: QuestionDataBuilder.generateBody()
        };
    }

    static generateBody() {
        return {
            'clientId': mongoose.Types.ObjectId(),
            'userId': mongoose.Types.ObjectId(),
            'content': faker.random.alphaNumeric(300),
            'status': faker.random.arrayElement([QuestionEnum.getStatusEnum().OPEN,
                QuestionEnum.getStatusEnum().ANSWERED]),
            'answerId': mongoose.Types.ObjectId()
        }
    }
};
