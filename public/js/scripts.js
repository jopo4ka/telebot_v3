var socket = io();

var c = document.querySelector('#manCh');

//Функция подписки на новые сообщения
//========================================
//======TODO: Переделать на socket =======
//========================================
/*
function subscribe(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/msg", true);
  xhr.onload = function(){
  var prepareMsg = JSON.parse(this.response);
    if(this.response != tempMsg && id == prepareMsg.from.id){
      var list = document.getElementById('msg-box')
      var newDiv = document.createElement('div')
      newDiv.className = 'alert alert-danger'
      newDiv.innerHTML = prepareMsg.from.id+ " | " +prepareMsg.text;
      list.appendChild(newDiv);
      list.scrollTop = list.scrollHeight;
    }
    tempMsg = this.response;
    setTimeout(subscribe, 2000)
  };

  xhr.onerror = xhr.onabort = function(){
    setTimeout(subscribe, 30000);
  };

  xhr.send('');
}
*/
socket.on("incoming_msg", args=>{
  //var prepareMsg = JSON.parse(this.args);
  if(id == args.from.id){
    var list = document.getElementById('msg-box')
    var newDiv = document.createElement('div')
    newDiv.className = 'alert alert-danger'
    newDiv.innerHTML = args.from.id+ " | " +args.text;
    list.appendChild(newDiv);
    list.scrollTop = list.scrollHeight;
  }
})
// Функция для отправки сообщений
$('#snd').click(function(){
  socket.emit('reply msg', {text:$('#text').val(), usr:id});
  var cont = $('#msg-box');
  cont.append('<div class=\"alert alert-info\">BOT | ' + $('#text').val()+ '</div>');
  cont.scrollTop(cont.prop('scrollHeight'))
  $('#text').val('');
  return false;
});

// Чек-бокс для изменения режима ответа (руч\Автомат)
$('#manCh').click(function(){
  c.checked != c.checked;
  socket.emit('change man', {man:c.checked, id:id });
});

//Кнопка изменения состояния оплаты
$('.change').click(function(){
  var nOrder = $(this).val();
  socket.emit('change_payd', {num:nOrder});
  console.log("emited socket", nOrder);
});

//Инициализация чекбокса режима ответы
function chMan(){
  var c = document.querySelector('#manCh');
  c.checked = manMode;  // поставить checked, если он не установлен
    var list = document.getElementById('msg-box')
    list.scrollTop = list.scrollHeight;
}

//Страница загружена
window.onload = chMan();
