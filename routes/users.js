var express = require('express');
var router = express.Router();
var dbUtils = require('./../modules/database/utils')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  dbUtils.getMsg(req.params["id"], (usrs, msgs)=>{
		dbUtils.checkMan(req.params["id"], (manMode)=>{
			res.render('messages', { title: 'Telebot admin panel', id:req.params["id"], database:usrs, msgs:msgs, man:manMode});
			console.log("Result checkMan "+ manMode);
		});
	});
});

module.exports = router;
