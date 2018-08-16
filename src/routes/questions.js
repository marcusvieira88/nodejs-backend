import express from 'express';
import QuestionController from '../business/QuestionBusiness';
import QuestionValidator from '../validators/QuestionValidator';

const router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        new QuestionValidator().validateBody(req);
        const question = await QuestionController.create(req);
        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
});

router.route('/:id')
    .get(async function(req, res, next) {
        try {
            new QuestionValidator().validateIds(req,'id');
            const question = await QuestionController.getById(req.params.id);
            res.status(200).json(question);
        } catch (error) {
            next(error);
        }
    })

    .put(async function(req, res, next) {
        try {
            new QuestionValidator().validateBodyAndId(req);
            const question = await QuestionController.update(req);
            res.status(200).json(question);
        } catch (error) {
            next(error);
        }
    })

    .delete(async function(req, res, next) {
        try {
            new QuestionValidator().validateIds(req,'id');
            const question = await QuestionController.deleteById(req.params.id);
            res.status(200).json(question);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
