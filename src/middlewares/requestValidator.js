import Helpers from "../utils/Helpers";
import expressValidator from "express-validator";

module.exports = expressValidator({
    customValidators: {
        isValidDateISO_8601: Helpers.isValidDateISO_8601,
        isValidEnum: (input, options) => options.includes(input)
    }
});

