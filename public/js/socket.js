var socket = io();

var c = document.querySelector('#manCh');
var tempMsg = null;

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
    //subscribe();
    setTimeout(subscribe, 2000)
  };
  
  xhr.onerror = xhr.onabort = function(){
    setTimeout(subscribe, 30000);
  };

  xhr.send('');
}
$(function () {
  $('#start-polling').click(function(){
    subscribe();
  })
  $('#snd').click(function(){
    socket.emit('reply msg', {text:$('#text').val(), usr:id});
    var cont = $('#msg-box');
    cont.append('<div class=\"alert alert-info\">BOT | ' + $('#text').val()+ '</div>');
    cont.scrollTop(cont.prop('scrollHeight'))
    $('#text').val('');
    return false;
  });
  $('#manCh').click(function(){
    c.checked != c.checked;
    socket.emit('change man', {man:c.checked, id:id });
  });
});
function chMan(){
  var c = document.querySelector('#manCh');
  c.checked = manMode;  // поставить checked, если он не установлен
  console.log('this is working | '+ manMode)
}
function init(){
  chMan();
  subscribe();
}
window.onload = init()

