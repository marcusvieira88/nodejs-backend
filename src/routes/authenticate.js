import express from 'express';
import AuthenticateBusiness from '../business/AuthenticateBusiness';
import AuthenticateValidator from '../validators/AuthenticateValidator';
const router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        new AuthenticateValidator().validateBody(req);
        const token = await AuthenticateBusiness.authenticate(req);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
