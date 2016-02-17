var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
    $messages.append("<p>" + message.text + "</p>");
});

//Handles submitting new messages 
var $form = jQuery('#message-form');
var $messages = jQuery('.messages');

$form.on('submit', function (event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', { text: $message.val() });
    text: $message.val('');    
});