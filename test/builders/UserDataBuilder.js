import faker from "faker";

export default class UserDataBuilder {

    static create() {
        return {
            body: UserDataBuilder.generateBody()
        };
    }

    static update(userId) {
        return {
            params: {
                id: userId
            },
            body: UserDataBuilder.generateBody()
        };
    }

    static generateBody() {
        return {
            'memberNo': faker.random.alphaNumeric(50),
            'name': faker.name.firstName(),
            'password': faker.random.alphaNumeric(20),
            'email': faker.internet.email()
        }
    }
};
