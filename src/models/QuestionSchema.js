import mongoose from "mongoose";
mongoose.plugin(require('@meanie/mongoose-to-json'));
import QuestionEnum from "../enums/QuestionEnum"
const SchemaTypes = mongoose.Schema.Types;

// Define the database model
const QuestionSchema = new mongoose.Schema({
        clientId: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: 'Client'
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            maxlength: 300,
            minlength: 0,
            required: true
        },
        status: {
            type: String,
            default: QuestionEnum.getStatusEnum().OPEN,
            enum: [
                QuestionEnum.getStatusEnum().OPEN,
                QuestionEnum.getStatusEnum().ANSWERED
            ]
        },
        answerId: {
            type: SchemaTypes.ObjectId,
            ref: 'Answer'
        },
        deleted_at: {
            type: Date
        }
    },
    {
        timestamps: true //generate the createAt and updateAt
    }
);

QuestionSchema.index({clientId: 1, userId: 1, deleted_at: 1});

module.exports = mongoose.model('Question', QuestionSchema);