var express = require('express');
//var dao = require('../model/galleryDao');
var clog = require('clog');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('index.html');
});

router.get('/*.html', function(req, res, next) {
    var url = req.url.substring(1,req.url.indexOf('.html'));
    res.render(url,{title:'프로젝트', bodyId:url, js:url+'.js'});
});

module.exports = router;