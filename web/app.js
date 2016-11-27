'use strict';

const CHAT_NAMESPACE = '/chat';
const DEFAULT_ROOM = 'default';

$(function(){

    let nickname = '';

    $('#login input').focus();

    $('#login input').keypress(function (e) {
        if (e.which === 13) {
            login();
            return false;
        }
    });

    $( "#login button" ).click(function() {
        login();
        return false;
    });

    function login() {
        if ($('#login input').val() !== '') {
            nickname = $('#login input').val();
            startChat();
            $('.overlay').delay(2000).hide();
        }
    }

    function startChat() {
        $('#message').focus();
        const socket = io.connect(CHAT_NAMESPACE);
        socket.emit('me', {name: nickname});

        socket.on('announcements', function(data) {
            console.log('Got announcement:', data.message);
        });

        socket.on('system', function(data) {
            console.log(data);

            $("#users").empty()
            data.users.forEach(function(element) {
                $("#users").prepend('<li>' + element + '</li>');
            });

            $("#rooms").empty();
            data.rooms.forEach(function(element) {
                $("#rooms").prepend('<li>' + element + '</li>');
            });
        });

        socket.on('message', function(data) {
            console.log('message from server:', data);
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
                socket.emit('message', { message: $('#message').val() });
                $('#message').val('');
            }
        }

        function newMessage(message) {
            $("#messages").prepend('<li>' + message + '</li>');
        }
    }
});
