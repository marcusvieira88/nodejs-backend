import faker from "faker";
import mongoose from "mongoose";

export default class AnswerDataBuilder {

    static create() {
        return {
            body: AnswerDataBuilder.generateBody()
        };
    }

    static update(answerId) {
        return {
            params: {
                id: answerId
            },
            body: AnswerDataBuilder.generateBody()
        };
    }

    static generateBody() {
        return {
            'userId': mongoose.Types.ObjectId(),
            'content': faker.random.alphaNumeric(300),
            'clientId': mongoose.Types.ObjectId(),
            'questionId': mongoose.Types.ObjectId()
        }
    }
};
