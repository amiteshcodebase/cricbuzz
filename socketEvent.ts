export const socketFunction = (io:any) =>{

  io.on('connection', (socket:any) => {
      console.log('user connected', socket.id)

      socket.on('join', function (userId: string) {
        console.log('join', userId)
        socket.join(userId)
        console.log(userId + ' : has joined the chat ')
      })
      socket.on('leave', (userId: string) => {
        socket.leave(userId)
        console.log('left ' + userId)
      })
      socket.on('messagedetection', function (conversation: any) {
        console.log('messagedetection', conversation)
        socket.broadcast.to(conversation.receiverId).emit('update_messages', conversation)
        socket.broadcast.to(conversation.receiverId).emit('update_unread_count', conversation)
        socket.broadcast.to(socket.userId).emit('update_unread_count', conversation)
      })

      socket.on('requestedcount', function() {
        socket.broadcast.to(socket.id).emit('update_requested_count', socket.id)
      }) 

      socket.on('disconnect', function () {
        socket.broadcast.emit('userdisconnect', ' user has left')
      })
    })

}