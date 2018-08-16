import mongoose from "mongoose";
mongoose.plugin(require('@meanie/mongoose-to-json'));

// Define the database model
const UserSchema = new mongoose.Schema({
        memberNo: {
            type: String,
            maxlength: 50,
            minlength: 0,
            require: true,
            unique: true
        },
        name: {
            type: String,
            maxlength: 100,
            minlength: 0
        },
        password:{
            type: String,
            maxlength: 100,
            minlength: 0,
            required: true
        },
        email: {
            type: String,
            maxlength: 100,
            minlength: 0
        },
        deleted_at: {
            type: Date
        }
    },
    {
        timestamps: true //generate the createAt and updateAt
    }
);

UserSchema.index({deleted_at: 1});
UserSchema.index({memberNo: 1, deleted_at: 1});

module.exports = mongoose.model('User', UserSchema);