'use strict';

$(document).ready(function () {
  $('#sendMessage').click(function () {
    var myobj = { from: $('#fromNumber').val(), to: $('#toNumber').val(), message: $('#messageToSend').val() };
    var jobj = JSON.stringify(myobj);
    $('#json').text(jobj);
    var url = 'messages/message';

    $.ajax({
      url: url,
      type: 'POST',
      data: jobj,
      contentType: 'application/json; charset=utf-8',
      success: function () {
        $('#done').html('Message Sent!');
        getMessages();
      }
    });
  });

  var getMessages = function () {
    var geturl = 'messages/message?from=' + $('#fromNumber').val() + '&to=' + $('#toNumber').val();

    $.getJSON(geturl, function (data) {
      var everything = '<ul>';

      for (var message in data) {
        var com = data[message];
        everything += '<li> From: ' + com.from + ' -- Message: ' + com.message + '</li>';
      }

      everything += '</ul>';
      $('#messages').html(everything);
    });
  };

  $('#getMessages').click(function () {
    getMessages();
  });


  $('#deleteMessages').click(function () {
    $.ajax({
      url: 'messages/message',
      type: 'delete',
      success: function () {
        // Do something with the result
        $('#messages').html('');
      }
    });
  });
});

