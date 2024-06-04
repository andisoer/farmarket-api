var express = require('express');
var router = express.Router();

const multer = require('multer');
const vegetableHandler = require('../handler/vegetable_handler.js');

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
        res.json(await vegetableHandler.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

/* POST Vegetable */
router.post('/', async (req, res, next) => {
    try {
        const response = await vegetableHandler.insertVegetable(req)

        res.status(401).json(response);
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});



module.exports = router;
