## Protocol

### Visible to the user

messages
- room
- private
- group

users
- joined
- left
- created room

rooms
- created
- destroyed

stats
- number of users
- number of messages

events
- last 10, buffered messages

### Not visible to the user

debugging
- log (system level messages)

Emit to all in the namespace
io.sockets.emit('an event sent to all connected clients');
io.emit('an event sent to all connected clients');

socket.join() - join a room
socket.leave()

emit to room
socket.to('others').emit('an event', { some: 'data' });

### Socket io options

Namespaces - top level, separate pools of sockets

var chat = io.of('/chat')


socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
