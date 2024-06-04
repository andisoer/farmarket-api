var express = require('express');
var router = express.Router();

const multer = require('multer');
const vegetableController = require('../controller/vegetable_controller');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // File name
    }
});
const upload = multer({ storage: storage });

/* GET Vegetables */
router.get('/', async (req, res, next) => {
    try {
        res.json(await vegetableController.getAll(req.query.page, req.query.limit));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

/* POST Vegetable */
router.post('/', async (req, res, next) => await vegetableController.addVegetable(req, res, next));

module.exports = router;
