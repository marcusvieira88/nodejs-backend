export default class ApplicationError {
    constructor(type, fieldData) {
        if (type && type.code) this.code = type.code;
        if (type && type.text && fieldData) this.text = fillHintParameters(type.text, fieldData);
        if (type && type.hints && fieldData) this.hints = fillHintParameters(type.hints, fieldData);
        if (type && type.info) this.info = type.info;
    }
}

/**
 * Fill the parameters in the hint string
 * @param hintText : string that represents the hint text
 * @param fieldData : parameters used to validate the field
 * @returns string - hintTextFilled
 */
function fillHintParameters(hintText, fieldData) {
    let text = '';
    if (hintText && fieldData) {
        text = hintText;
        for (let key in fieldData) {
            if (hintText.includes('${' + key + '}')) {
                text = text.replace('${' + key + '}', fieldData[key]);
            }
        }
    }
    return text;
}