import express from 'express';
import UserController from '../business/UserBusiness';
import UserValidator from '../validators/UserValidator';
import ClientValidator from "../validators/ClientValidator";
import ClientController from "../business/ClientBusiness";

const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        const users = await UserController.getAll(req);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/clients', async function(req, res, next) {
    try {
        new ClientValidator().validateIds(req,'id');
        const clients = await UserController.getAllClientsWithQuestion(req.params.id);
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/client/:clientId/questions',async function(req, res, next) {
    try {
        new UserValidator().validateIds(req,'id','clientId');
        const questions = await UserController.getAllQuestionsByClientIdAndExpertId(req.params.clientId,req.params.id);
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

router.post('/registration', async function(req, res, next) {
    try {
        new UserValidator().validateBody(req);
        const user = await UserController.create(req);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.route('/:id')
    .get(async function(req, res, next) {
        try {
            new UserValidator().validateIds(req,'id');
            const user = await UserController.getById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    })

    .put(async function(req, res, next) {
        try {
            new UserValidator().validateBodyAndId(req);
            const user = await UserController.update(req);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    })

    .delete(async function(req, res, next) {
        try {
            new UserValidator().validateIds(req,'id');
            const user = await UserController.deleteById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
