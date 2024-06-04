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

router.get('/', async (req, res, next) => await vegetableController.getAll(req, res));
router.post('/', async (req, res, next) => await vegetableController.addVegetable(req, res));

module.exports = router;
