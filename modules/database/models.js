var Schema = require("mongoose").Schema;
var mongoose = require("mongoose");

// установка схемы
var userScheme = new Schema({
	_id : Number,
	first_name: {
		type: String,
		default: "NoName"
	},
	last_name: {
		type: String,
		default: "NoName"
	},
	city: {
		type: String,
		default: "NOT"
	},
	payd: {
		type: Boolean,
		default: false
	},		
	cash: {
		type: Number,
		default: 0
	},
	manual: {
		type: Boolean,
		default: false
	}
});

var msgScheme = new Schema({
	from:{
		type: Number,
		default: 0
	},
	to:{
		type: String,
		default:'bot'
	},
	important: {
		type: Boolean,
		default: false
	},
	text:{
		type: String,
		default: "nothing"
	},
	created:{
		type: Date,
		default: Date.now
	}
});

var ordrScheme = new Schema({
	created:{
		type: Date,
		default: Date.now
	},
	owner: {
		type: Number,
		default: 0
	},
	num: {
		type: Number,
		default: 0
	},
	text: {
		type: String,
		default: "Nothing"
	},
	payd: {
		type: Boolean,
		default: false
	}
})

var User = mongoose.model("User", userScheme);
var Message = mongoose.model("Message", msgScheme);
var Order = mongoose.model("Order", ordrScheme);

module.exports = {user:User, message: Message, order: Order};

var req = {
	"message_id":12,
	"from":{
		"id":415021035,
		"is_bot":false,
		"first_name":"Sergey",
		"last_name":"Sergey",
		"language_code":"ru"
	},
	"chat":{
		"id":415021035,
		"first_name":"Sergey",
		"last_name":"Sergey",
		"type":"private"
	},
	"date":1510765831,
	"text":"/start",
	"entities":[{"offset":0,"length":6,"type":"bot_command"}]
}
