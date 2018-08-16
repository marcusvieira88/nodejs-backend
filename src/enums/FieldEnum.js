class FieldsEnum {

    /**
     * Represent the fields types
     */
    static getFieldsTypesEnum() {
        return {
            OBJECT_ID: 'OBJECT_ID',
            STRING: 'STRING',
            ENUM: 'ENUM',
            BOOLEAN: 'BOOLEAN',
            DATE_ISO8601: 'DATE_ISO8601',
            URL: 'URL',
            EMAIL: 'EMAIL'
        };
    }
}

module.exports = FieldsEnum;