var express = require('express');
var router = express.Router();
var dbUtils = require('./../modules/database/utils')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  dbUtils.getMsg(req.params["id"], (usrs, msgs)=>{
		dbUtils.checkMan(req.params["id"], (manMode)=>{
      var tempVar = {"from":{
                            "id":req.params["id"]
                          }
                    };
      //.from.id = req.params["id"];
      dbUtils.getOrders(tempVar, (orders)=>{
        res.render('messages', { title: 'Telebot admin panel', id:req.params["id"],     /* Параметры для передачи шаблонизатору */
                                database:usrs, msgs:msgs, man:manMode, ordrs:orders});  /* Пользователи | Сообщения | Режим отправки | заказы */
        //console.log("Result checkMan "+ manMode);
      });
		});
	});
});

module.exports = router;
