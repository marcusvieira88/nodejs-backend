import requestIp from "request-ip";
import Logger from "../utils/Logger";

module.exports = function (err, req, res, next) {
    let errorStatus = 500;
    let data = '';
    let stack = '';

    if (err.status) errorStatus = err.status;
    if (err.data) data = err.data;
    if (err.stack) stack = err.stack;

    const ip = requestIp.getClientIp(req);
    const userAgent = req.headers['user-agent'];
    Logger.error(`status: ${errorStatus} - ip: ${ip} - method: ${req.method} - ${req.originalUrl} - userAgent: ${userAgent} - errorMessage: ${err.message}`);
    Logger.error(`stack: ${stack}`);
    //return error message
    res.status(errorStatus).json({"status": errorStatus, "data": data, "message": err.message});
};

