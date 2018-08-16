import mung from "express-mung";

function responseTransform(body, req, res) {
    if (res.statusCode === 200 && body && body.message) {
        return body;
    }
    return {"status": res.statusCode, "data": body, "message": "Success"};
}

module.exports = mung.json(responseTransform);

