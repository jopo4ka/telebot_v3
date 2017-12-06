var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var models = require('./models');
// подключение
var uri = 'mongodb://jopo4ka:Password1@ds129156.mlab.com:29156/telebot_v2';
//var uri = 'mongodb://localhost/test'
var db = mongoose.connect(uri, {useMongoClient:true})

function random(min, max)
{
  return Math.random() * (max - min) + min;
}

module.exports.addUser = function(msg){
		var user = new models.user({_id : msg.from.id, first_name: msg.from.first_name, last_name: msg.from.last_name});
		user.save((err)=> {
			if(err) return console.log(err);
			console.log("Сохранен объект user", user);
		});
}

module.exports.updCity = function(msg, imp){
	models.user.findById(msg.from.id, function (err, doc) {
		if (err) throw err;
		doc.city = msg.text;
		doc.save((err)=>{
			if (err) throw err;
			console.log('City is updated | new city: '+msg.text);
		});
	});
}

module.exports.addMessage = function(msg, imp){
	if (imp == undefined) imp = false;
		var dbMsg = new models.message( { from: msg.from.id, text: msg.text, important : imp } )
		dbMsg.save((err)=>{
			if (err) throw err;
			console.log('Message succesfull added | text: '+ msg.text);
		})
}

module.exports.addMyMessage = function(text, to){
	var myMsg = new models.message( { 'text': text, 'to' : to } )
	myMsg.save(err=>{
		if (err) throw err;
		console.log('Succesfull added my message');
	})
} 

module.exports.addOrder = function(msg, match, group, imp){
	if (group == undefined) group = "WTF???";
		var dbOrder = new models.order({owner: msg.from.id, num: random(1000, 9999)|0, text: group +" | "+ match[1] });
		dbOrder.save((err)=>{
			if(err) throw err;
			console.log("Object saved: "+ dbOrder)
		})
	console.log('Text message | '+ msg.text)
}

module.exports.getOrders = function(msg, callback){
	models.order.find({owner: msg.from.id}, function (err, ordrs) {
		if (err) throw err;
		callback(ordrs);
	});
}
module.exports.getUsers = function(callback){
		models.user.find((err, usrs)=>{
			if (err) throw err;
			console.log('succes getted users')
			callback(usrs);
		});
}

module.exports.checkMan = function(id, callback){
	models.user.findById(id, (err, usr)=>{
		callback(usr.manual);
		return usr.manual;
	});
}

module.exports.getMsg = function(id, callback){
	var users, messages;
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

module.exports.changeMan= function(id, man){
	models.user.findById(id, (err, usr)=>{
		if (err) throw err;
		usr.manual = man;
		usr.save(err=>{
			if (err) throw err;
			console.log('Manual mode succesfull chaned')
		})
	})
}

