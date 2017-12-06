var express = require('express');
var router = express.Router();
var dbUtils = require('./../modules/database/utils')

/* GET home page. */
router.get('/', function(req, res, next) {
  dbUtils.getUsers(result=>{
		res.render('index', { title: 'Telebot admin panel', database:result});
	});
});

router.get('/msg', (req, res)=>{
	if (!global.msg) {global.msg ='{"from":{ "id":"SERVER"}, "text": "FIRST CONNECTION ERROR"}'}
	res.send(global.msg);
});

module.exports = router;
