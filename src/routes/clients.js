import express from 'express';
import ClientController from '../business/ClientBusiness';
import ClientValidator from '../validators/ClientValidator';
const router = express.Router();

router.post('/registration', async function(req, res, next) {
    try {
        new ClientValidator().validateBody(req);
        const client = await ClientController.create(req);
        res.status(200).json(client);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/expert/:expertId/questions',async function(req, res, next) {
  try {
    new ClientValidator().validateIds(req,'id','expertId');
    const questions = await ClientController.getAllQuestionsByClientIdAndExpertId(req.params.id,req.params.expertId);
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

router.route('/:id')
    .get(async function(req, res, next) {
        try {
            new ClientValidator().validateIds(req,'id');
            const client = await ClientController.getById(req.params.id);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    })

    .put(async function(req, res, next) {
        try {
            new ClientValidator().validateBodyAndId(req);
            const client = await ClientController.update(req);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    })

    .delete(async function(req, res, next) {
        try {
            new ClientValidator().validateIds(req,'id');
            const client = await ClientController.deleteById(req.params.id);
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
