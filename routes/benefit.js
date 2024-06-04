var express = require('express');
var router = express.Router();

const benefitController = require('../controller/benefit_controller');

router.get('/', async (req, res, next) => await benefitController.getAll(req, res));
router.post('/', async (req, res, next) => await benefitController.addBenefit(req, res));

module.exports = router;
