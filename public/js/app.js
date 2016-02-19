var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'No Room';
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
    socket.emit('joinRoom', { name: name, room: room });
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp).local();
    
    var $message = jQuery('<li class="list-group-item"></li>');
    
    $message.append('<p><strong> ' + message.name + ' ' + momentTimestamp.format('h:mm:ss a') + '</strong></p>'); 
    $message.append('<p>' + message.text + '</p>');
    
    $messages.append($message);
});

//Handles submitting new messages 
var $form = jQuery('#message-form');
var $messages = jQuery('#messages');
var $room = jQuery('#chat-room');
$room.text(room);

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