'use strict';

$(function(){

    $('#message').focus();

    const socket = io.connect('/');

    socket.on('announcements', function(data) {
        console.log('Got announcement:', data.message);
    });

    socket.on('stats', function(data) {
        console.log('Connected clients:', data.numClients);
    });

    socket.on('message', function(data) {
        console.log('message from clients:', data);
        newMessage(data.message);
    });

    $( "#chat > button" ).click(function() {
        sendMessage();
        $('#message').focus();
        return false;
    });

    $('#message').keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    function sendMessage() {
        if ($('#message').val() !== '') {
            console.log("send click " + $('#message').val());
            socket.emit('event', { message: $('#message').val() });
            $('#message').val('');
        }
    }

    function newMessage(message) {
        $("#messages").append('<li>' + message + '</li>');
    }
});
