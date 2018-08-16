import moment from 'moment';
import bcrypt from 'bcrypt';
import UserEnum from '../enums/UserEnum';
import jwt from "jsonwebtoken";

export default class Helpers {

    /**
     * Check if the date is a ISO_8601 format
     * @param date - date to be checked
     * @return boolean - true if valid and false if not
     */
    static isValidDateISO_8601(date) {
        if (!date) return false;
        return moment(date, moment.ISO_8601).isValid();
    }

    /**
     * Generate the hash based in a provided value
     * @param value - data for generate hash
     * @return string
     */
    static generateHash(value) {
        return bcrypt.hashSync(value, 12);
    }

    /**
     * Compare hash with a value
     * @param value - value that will be checked
     * @param hash - hash value
     * @return boolean - true if its a hash of
     * the provided value
     */
    static compareHash(value, hash) {
        return bcrypt.compare(value, hash);
    }

    /**
     * Generate a fresh token
     * @param userType - if user is client or user
     * @param userId - if is client is the email if is user is the memberNo
     * @return string - fresh token
     */
    static generateToken(userType, userId) {
        const userData = {
            userType: userType,
            userId : userId
        };
        return jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn : 60*60*24 //expires in 24 hours
        });
    }

    /**
     * Creates the notification of answer message
     * @param clientId - client that will receive the notification
     * @param user - expert that answered the question
     * @return object - true if valid and false if not
     */
    static createAnswerNotification(clientId, user) {
        if(!user.name) user.name = '';

        return  {
            receiverId: clientId,
            receiverType: UserEnum.getTypesEnum().CLIENT,
            text: `The expert ${user.name} answered your question.`,
        };
    }

    /**
     * Creates the notification of question message
     * @param userId - expert that will receive the notification
     * @param client - client that made the question
     * @return object - true if valid and false if not
     */
    static createQuestionNotification(userId, client) {
        if(!client.firstName) client.firstName = '';
        if(!client.lastName) client.lastName = '';

        return  {
            receiverId: userId,
            receiverType: UserEnum.getTypesEnum().USER,
            text: `The client ${client.firstName} ${client.lastName} made a question.`,
        };
    }
}



