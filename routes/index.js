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
router.get('/search', modelMain.get_search);
router.post('/search', modelMain.post_search);

router.get('/addmovie', modelMain.get_addmovie);
router.post('/addmovie', modelMain.post_addmovie);

router.get('/deletemovie', modelMain.get_deletemovie);
router.post('/deletemovie', modelMain.post_deletemovie);

router.get('/updatemovie', modelMain.get_updatemovie);
router.post('/updatemovie', modelMain.post_updatemovie);


module.exports = router;