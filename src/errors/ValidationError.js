export default class ValidationError extends Error {
    constructor(message, data) {
        super(message);
        this.name = "ValidationError";
        this.status = 422;
        this.data = data;
    }
}