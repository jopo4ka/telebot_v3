const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf('432798090:AAHSlICzRW9WqsTz80Jx9YfqEioqA0hWtaA')
//const bot = new Telegraf('463835817:AAEqgS7QrA5ESzMRRVuesEUHmpMuCbeAyBA')
var debug = require('debug')('telebot-v3:bot');
const keyboards = require('./keyboards');
var dbUtils = require('./../database/utils');
var mDbg = true;
var msg;

//Start command is received
bot.start((ctx) => {
	if (mDbg)
		debug('started:', ctx.from.id)

	dbUtils.addUser(ctx.message, req=>{
		if (req){
			var prepMsg = 'Добро пожаловать к нам! Пожалуйста, выберите город из меню ниже.'
			ctx.reply(prepMsg, Markup
			.keyboard(keyboards.city)
			.oneTime()
			.resize()
			.extra()
			)
			dbUtils.addMyMessage(prepMsg, ctx.from.id);
		}else{
			if(dbUtils.checkMan(ctx.from.id)){
				debug("NOT MANUAL MODE")
			}else{debug('Manual mode')}
		}
	});
})

// City change menu
bot.hears(['1️⃣ Дефолт', '2️⃣ НУ', '3️⃣ Уфа', '4️⃣ Москва' ], ctx => {
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.updCity(ctx.message);
	dbUtils.addMessage(ctx.message);
		var prepMsg = 'Замечательный город! Выберете группу товаров из меню ниже.';
		ctx.reply(prepMsg, Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
		)
		dbUtils.addMyMessage(prepMsg, ctx.from.id);
	//}
})

//Back in main menu
bot.hears('👣 Назад', ctx=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message);
	ctx.reply('Вернулись.', Markup
	.keyboard(keyboards.groups)
	.oneTime()
	.resize()
	.extra()
	)
})

//Price menu
bot.hears('🌚 Гашик (натур)', (ctx) =>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.gar)
	.oneTime()
	.resize()
	.extra()
	)
})
//Create new order
bot.hears(/^🌚 (.+)/, (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addOrder(ctx.message, ctx.match, "Гашик");
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Спасибо за заказ. Проверить состояние заказа можно выбрав пункт меню: \"Посмотреть текущий заказ\".', Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
	)
});

bot.hears('☢️ тв (гаш химка)', (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.tv)
	.oneTime()
	.resize()
	.extra()
	)
})
//Create new order
bot.hears(/^☢️ (.+)/, (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addOrder(ctx.message, ctx.match, "тв");
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Спасибо за заказ. Проверить состояние заказа можно выбрав пункт меню: \"Посмотреть текущий заказ\".', Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
	)
});

bot.hears('👁 Марки (лизер,лсд)', (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message);
	ctx.reply('Выберете количество и цену из меню ниже.', Markup
	.keyboard(keyboards.mar)
	.oneTime()
	.resize()
	.extra()
	)
})
//Create new order
bot.hears(/^👁 (.+)/, (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addOrder(ctx.message, ctx.match, "Марки");
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Спасибо за заказ. Проверить состояние заказа можно выбрав пункт меню: \"Посмотреть текущий заказ\".', Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
	)
});

bot.hears('💎 СК (кристаллы,лёд)', (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.sk)
	.oneTime()
	.resize()
	.extra()
	)
})
//Create new order
bot.hears(/^💎 (.+)/, (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addOrder(ctx.message, ctx.match, "СК");
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Спасибо за заказ. Проверить состояние заказа можно выбрав пункт меню: \"Посмотреть текущий заказ\".', Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
	)
});

bot.hears('⚗️ Мефедрон (заводской)', (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.mef)
	.oneTime()
	.resize()
	.extra()
	)
})
//Create new order
bot.hears(/^⚗️ (.+)/, (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addOrder(ctx.message, ctx.match, "Мефедрон");
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Спасибо за заказ. Проверить состояние заказа можно выбрав пункт меню: \"Посмотреть текущий заказ\".', Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
	)
});

bot.hears('💰 Работа у нас', (ctx) =>{
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Пожалуйста оставайтесь в сети, наши операторы с вами свяжутся.', Markup
	.keyboard(keyboards.sk)
	.oneTime()
	.resize()
	.extra()
	)
})

//get current orders
bot.hears(/^🗂 /, (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	var prepareMsg = '';
	dbUtils.getOrders(ctx.message, (res)=>{
		if (mDbg)
			debug("Заказы пользователя | "+ ctx.message.from.id)

		prepareMsg += "Ваш заказ \n"
		prepareMsg += '-----------------------------------\n';
		if (mDbg)
			debug("------------------------------------")
		var num = 1;
		for (var ordr in res){
			var temp = res[ordr].payd ? "Оплачен" : "Не оплачен";
			prepareMsg += num+ ' | '+ res[ordr].num+ ' | '+ res[ordr].text + ' | ' + temp +'\n'
			if (mDbg)
				debug(num+ ' | '+ res[ordr].num+ ' | '+ res[ordr].text);
			num++
		}
		ctx.reply(prepMsg, Markup
			.keyboard(keyboards.groups)
			.oneTime()
			.resize()
			.extra()
		);
	});
});
bot.hears('💳 Способы оплаты заказа', (ctx)=>{
	global.socket.emit("incoming_msg", ctx.message);
	if (mDbg)
		debug("Способы оплаты");
	var prepMsg = "Для оплаты Вы можете использовать QIWI кошельки:\n"+
								"+7-987-123-45-67\n"+
								"+7-987-234-56-78\n"+
								"При оплате ОБЯЗАТЕЛЬНО указывайте комментарий с номером заказа";
	ctx.reply(prepMsg, Markup
		.keyboard(keyboards.groups)
		.oneTime()
		.resize()
		.extra()
	);
});

//Added another messages in database
bot.on('message', (ctx) => {
	global.msg = ctx.message;
	dbUtils.addMessage(ctx.message, true);
	global.socket.emit("incoming_msg", ctx.message);
	dbUtils.checkMan(ctx.from.id, manMode=>{
	if (!manMode){
		var prepMsg = 'Простите, я Вас не понимаю. Пожалуйста воспользуйтесь меню.'
		ctx.reply(prepMsg)
		if (mDbg)
			debug('Received message | from: '+ ctx.from.id);
		dbUtils.addMyMessage(prepMsg, ctx.from.id);
	}else{if (mDbg) {debug('Manual mode')}}
	})
})

module.exports.reply = function(id, text){
	bot.telegram.sendMessage(id, text);
}

bot.startPolling()
