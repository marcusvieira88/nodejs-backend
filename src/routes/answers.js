import express from 'express';
import AnswerController from '../business/AnswerBusiness';
import AnswerValidator from '../validators/AnswerValidator';
const router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        new AnswerValidator().validateBody(req);
        const answer = await AnswerController.create(req);
        res.status(200).json(answer);
    } catch (error) {
        next(error);
    }
});

router.route('/:id')
    .get(async function(req, res, next) {
        try {
            new AnswerValidator().validateIds(req,'id');
            const answer = await AnswerController.getById(req.params.id);
            res.status(200).json(answer);
        } catch (error) {
            next(error);
        }
    })

    .put(async function(req, res, next) {
        try {
            new AnswerValidator().validateBodyAndId(req);
            const answer = await AnswerController.update(req);
            res.status(200).json(answer);
        } catch (error) {
            next(error);
        }
    })

    .delete(async function(req, res, next) {
        try {
            new AnswerValidator().validateIds(req,'id');
            const answer = await AnswerController.deleteById(req.params.id);
            res.status(200).json(answer);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
