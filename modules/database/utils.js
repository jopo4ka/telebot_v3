var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var models = require('./models');
// подключение
// please uncomment for remote host
// var uri = 'mongodb://jopo4ka:Password1@ds129156.mlab.com:29156/telebot_v2';
// please uncomment for local host
var uri = 'mongodb://localhost/test'
var db = mongoose.connect(uri, {useMongoClient:true});
var debug = require('debug')('telebot-v3:database');
var debugErr = require('debug')('telebot-v3:ErrorDB');
var DBDebug = require('debug')('telebot-v3:DBDebug');

function random(min, max)
{
  return Math.random() * (max - min) + min;
}
// Добавление нового пользователя в БД
module.exports.addUser = function(msg, firstReg){
	var user = new models.user({_id : msg.from.id, first_name: msg.from.first_name, last_name: msg.from.last_name});
  var fr = true;
	user.save((err)=> {
		if(err) {
      fr = false;
      firstReg(fr);
      return console.log(err);
    }
		debug("Сохранен объект user", user);
    firstReg(fr);
	});
}
// Изменение города в БД пользователя
module.exports.updCity = function(msg, imp){
	models.user.findById(msg.from.id, function (err, doc) {
    debug(doc);
    if (doc != null){
  		if (err) throw err;
      if (msg.text != null){
    		doc.city = msg.text;
    		doc.save((err)=>{
    			if (err) throw err;
    			debug('City is updated | new city: '+msg.text);
  		  });
      }else {debugErr("Message is \"null\"")}
    }else {debugErr("User is \"null\"")}
  });
}
//Добавление сообщений в БД
module.exports.addMessage = function(msg, imp){
	if (imp == undefined) imp = false;
		var dbMsg = new models.message( { from: msg.from.id, text: msg.text, important : imp } )
		dbMsg.save((err)=>{
			if (err) throw err;
			debug('Message succesfull added | text: '+ msg.text);
		})
}
// Добавление сообщений от бота
module.exports.addMyMessage = function(text, to){
	var myMsg = new models.message( { 'text': text, 'to' : to } )
	myMsg.save(err=>{
		if (err) throw err;
		debug('Succesfull added my message');
	})
}
// Добавление нового заказа
module.exports.addOrder = function(msg, match, group, imp){
	if (group == undefined) group = "WTF???";
		var dbOrder = new models.order({owner: msg.from.id, num: random(1000, 9999)|0, text: group +" | "+ match[1] });
		dbOrder.save((err)=>{
			if(err) throw err;
			debug("Object saved: "+ dbOrder)
		})
	debug('Text message | '+ msg.text)
}
// Получение всех заказов пользователя
module.exports.getOrders = function(msg, callback){
	models.order.find({owner: msg.from.id}, function (err, ordrs) {
		if (err) throw err;
		callback(ordrs);
	});
}
// Получение всех пользователей
module.exports.getUsers = function(callback){
		models.user.find((err, usrs)=>{
			if (err) throw err;
			debug('succes getted users')
			callback(usrs);
		});
}
// Проверка режима ответа от сервера (Ручной\Автоматический)
module.exports.checkMan = function(id, callback){
	models.user.findById(id, (err, usr)=>{
		callback(usr.manual);
		return usr.manual;
	});
}
// Получение всех сообщений и фильтрация по пользователю
module.exports.getMsg = function(id, callback){
	var users, messages;
  // ==================================================
  // ===== TODO: Проверить где это используется =======
  // ==================================================
		models.user.find((err, usrs)=>{
			if (err) throw err;
			users = usrs;
		});
		models.message.find({ $or: [ { from: id, to:'bot' }, { to: id, from:0 } ] } , (err, msgs)=>{
			if (err) throw err;
			messages = msgs;
			callback(users, messages);
		});
}
// Изменение метода отправки сообщений
module.exports.changeMan= function(id, man){
	models.user.findById(id, (err, usr)=>{
		if (err) throw err;
		usr.manual = man;
		usr.save(err=>{
			if (err) throw err;
			debug('Manual mode succesfull chaned')
		})
	})
}
// Изменение состояния заказа "(Не)Оплачен"
module.exports.changePayd= function(num, cb){
    models.order.findOne({"num":num}, (err, res)=>{
      if (err) throw err;
      DBDebug(res);
      cb(res);
    });
}
