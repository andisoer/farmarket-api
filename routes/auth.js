var express = require('express');
var router = express.Router();

/* Register. */
const authenticationController = require('../controller/authentication_controller');

router.post('/register', async (req, res, next) => await authenticationController.register(req, res));

module.exports = router;
