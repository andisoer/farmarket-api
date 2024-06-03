var express = require('express');
var router = express.Router();
const vegetableHandler = require('../handler/vegetable_handler.js');

/* GET vegetables listing. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await vegetableHandler.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});



module.exports = router;
