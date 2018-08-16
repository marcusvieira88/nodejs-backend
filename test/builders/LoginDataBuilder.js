
export default class LoginDataBuilder {

    static create(type, userId, password) {
        return {
            type: type,
            userId: userId,
            password: password
        };
    }
};
