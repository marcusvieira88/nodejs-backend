import mongoose from "mongoose";
mongoose.plugin(require('@meanie/mongoose-to-json'));
import UserEnum from "../enums/UserEnum";
const SchemaTypes = mongoose.Schema.Types;

// Define the database model
const NotificationSchema = new mongoose.Schema({
        receiverId: {
            type: SchemaTypes.ObjectId,
            required: true,
        },
        receiverType: {
            type: String,
            enum: [
                UserEnum.getTypesEnum().USER,
                UserEnum.getTypesEnum().CLIENT
            ]
        },
        text: {
            type: String,
            maxlength: 200,
            minlength: 0,
            required: true
        },
        readAt: {
            type : Date
        },
        deleted_at: {
            type: Date
        }
    },
    {
        timestamps: true //generate the createAt and updateAt
    }
);

NotificationSchema.index({receiverId: 1, receiverType: 1, readAt: 1, deleted_at: 1});

module.exports = mongoose.model('Notification', NotificationSchema);