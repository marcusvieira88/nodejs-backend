class ErrorEnum {

    /**
     * Represent the error types
     */
    static getErrorTypesEnum() {
        return {
            UNKNOWN_ERROR: {
                code: 5000,
                text: 'unknown error',
                hints: "Please contact development team with information on 'how to reproduce this error'. Thank you for your help and support.",
                info: "http://api.adviqo.de/documentation/error#unknownerror"
            },
            REQUIRED_FIELD: {
                code: 7000,
                text: '${name} must be provided',
                hints: "Please check that request has provided the value for ${name}",
                info: "http://api.adviqo.de/documentation/error#RequiredField"
            },
            INVALID_STRING: {
                code: 7001,
                text: '${name} must be string',
                hints: "Please check that request has provided the valid string value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidStringField"
            },
            INVALID_DATE: {
                code: 7002,
                text: '${name} must be date (e.g. DD-MM-YYYY)',
                hints: "Please check that request has provided the valid date value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidDateField"
            },
            INVALID_BOOLEAN: {
                code: 7003,
                text: '${name} must be boolean',
                hints: "Please check that request has provided the valid boolean value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidBooleanField"
            },
            INVALID_ENUM: {
                code: 7004,
                text: '${name} must be valid enum',
                hints: "Please check that request has provided the valid enum value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidEnumField"
            },
            INVALID_LENGTH: {
                code: 7005,
                text: '${name} must have length between ${min} and ${max}',
                hints: "Please check that request has provided the valid length for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidLengthField"
            },
            INVALID_ID: {
                code: 7006,
                text: '${name} must be valid',
                hints: "Please check that request has provided the valid id value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidIdField"
            },
            INVALID_URL: {
                code: 7007,
                text: '${name} must be a valid url',
                hints: "Please check that request has provided the valid url value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidUrlField"
            },
            INVALID_EMAIL: {
                code: 7008,
                text: '${name} must be a valid email',
                hints: "Please check that request has provided the valid email value for ${name}",
                info: "http://api.adviqo.de/documentation/error#InvalidEmailField"
            }
        };
    }
}

module.exports = ErrorEnum;