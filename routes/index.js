var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");
var modelMain = require("../model/mainModel");
var multer = require("multer");
var bodyParser = require("body-parser")

router.get('/', modelMain.get_home);

router.post('/homepage', modelMain.post_home);

router.get('/display', modelMain.get_movielist);
router.post('/display', modelMain.post_movielist);
router.get('/dashboard', ctrlMain.get_dash);
router.post('/dashboard', ctrlMain.post_dash);
router.get('/analytics', modelMain.get_analytics);
router.post('/analytics', modelMain.post_analytics);
router.get('/data', modelMain.get_data);
router.get('/budget', modelMain.get_budget);
router.post('/budget', modelMain.post_budget);
router.get('/family', modelMain.get_family);
router.post('/family', modelMain.post_family);
router.get('/stars', modelMain.get_star);
router.post('/stars', modelMain.post_star);
router.get('/fail', modelMain.get_fail);
router.post('/fail', modelMain.post_fail);






module.exports = router;