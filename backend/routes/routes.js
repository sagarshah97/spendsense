const express = require('express');
const addData = require('../controllers/SampleController/add-data');
const findData = require('../controllers/SampleController/find-data');
const router = express.Router();

router.route('/addData').post(addData);
router.route('/findData').get(findData);

module.exports = router;
