const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf('432798090:AAHSlICzRW9WqsTz80Jx9YfqEioqA0hWtaA')
//const bot = new Telegraf('463835817:AAEqgS7QrA5ESzMRRVuesEUHmpMuCbeAyBA')

const keyboards = require('./keyboards');
var dbUtils = require('./../database/utils');

var msg;

//Start command is received
bot.start((ctx) => {
	console.log('started:', ctx.from.id)
	dbUtils.addUser(ctx.message);
	//if(dbUtils.checkMan(ctx.from.id)){
		var prepMsg = 'Добро пожаловать к нам! Пожалуйста, выберите город из меню ниже.'
		ctx.reply(prepMsg, Markup
		.keyboard(keyboards.city)
		.oneTime()
		.resize()
		.extra()
		)
		dbUtils.addMyMessage(prepMsg, ctx.from.id);
	//}else{console.log('Manual mode')}
})

// City change menu
bot.hears(['1️⃣ Дефолт', '2️⃣ НУ', '3️⃣ Ебеня', '4️⃣ Москва' ], ctx => {
	dbUtils.updCity(ctx.message);
	dbUtils.addMessage(ctx.message);
	//if(dbUtils.checkMan(ctx.from.id)){
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
	var prepareMsg = '';
	dbUtils.getOrders(ctx.message, (res)=>{
		console.log("Заказы пользователя | "+ ctx.message.from.id)
		prepareMsg += "Ваш заказ \n"
		prepareMsg += '-----------------------------------\n';
		console.log("------------------------------------")
		var num = 1;
		for (var ordr in res){
			prepareMsg += num+ ' | '+ res[ordr].num+ ' | '+ res[ordr].text + '\n'
			console.log(num+ ' | '+ res[ordr].num+ ' | '+ res[ordr].text)
			num++
		}
	ctx.reply(prepareMsg)
	});
});

//Added another messages in database
bot.on('message', (ctx) => {
	global.msg = ctx.message;
	dbUtils.addMessage(ctx.message, true);
	dbUtils.checkMan(ctx.from.id, manMode=>{
	if (!manMode){
		var prepMsg = 'Простите, я Вас не понимаю. Пожалуйста воспользуйтесь меню.'
		ctx.reply(prepMsg)
		console.log('Received message | from: '+ ctx.from.id);
		dbUtils.addMyMessage(prepMsg, ctx.from.id);
	}else{console.log('Manual mode')}
	})
})

module.exports.reply = function(id, text){
	bot.telegram.sendMessage(id, text);
}

bot.startPolling()
