var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'None';
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    $messages.append('<p><strong> ' + message.name + ' ' + momentTimestamp.format('h:mm:ss a') + '</strong></p>'); 
    $messages.append('<p>' + message.text + '</p>');
});

//Handles submitting new messages 
var $form = jQuery('#message-form');
var $messages = jQuery('.messages');

$form.on('submit', function (event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', 
    {
        name: name,
        room: room, 
        text: $message.val() 
    });
    text: $message.val('');    
});