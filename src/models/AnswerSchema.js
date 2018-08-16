import mongoose from "mongoose";
mongoose.plugin(require('@meanie/mongoose-to-json'));
const SchemaTypes = mongoose.Schema.Types;

// Define the database model
const AnswerSchema = new mongoose.Schema({
        userId: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        clientId: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: 'Client'
        },
        content: {
            type: String,
            maxlength: 300,
            minlength: 0,
            required: true
        },
        questionId: {
            type: SchemaTypes.ObjectId,
            ref: 'Question'
        },
        deleted_at: {
            type: Date
        }
    },
    {
        timestamps: true //generate the createAt and updateAt
    }
);

AnswerSchema.index({userId: 1, deleted_at: 1});
AnswerSchema.index({clientId: 1, deleted_at: 1});
AnswerSchema.index({questionId: 1, deleted_at: 1});

module.exports = mongoose.model('Answer', AnswerSchema);