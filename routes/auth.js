var express = require('express');
var router = express.Router();

/* Register. */
const authenticationController = require('../controller/authentication_controller');

router.post('/register', async (req, res, next) => await authenticationController.register(req, res));
router.post('/login', async (req, res, next) => await authenticationController.login(req, res));

module.exports = router;
