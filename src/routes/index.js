import express from 'express';
const router = express.Router();

// GET home page.
router.get('/', function (req, res, next) {
    try {
        res.send("Backend is Running");
    } catch (error) {
        next(error);
    }
});

module.exports = router;
