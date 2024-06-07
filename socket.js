export default function socketIO(io) {

    let users = {};
    users["admin"] = "admin";

    // 소켓 연결 이벤트 처리
    io.on('connection', (socket) => {
        socket.on("register", (userId) => {
            users[userId] = socket.id;
            console.log(`a user connected ${userId}`);
        })

        // 특정 사용자에게 메시지를 보냅니다.
        socket.on('send message', (data) => {
            const { toUserId, message } = data;
            const toSocketId = users[toUserId];

            if (toSocketId) {
                io.to(toSocketId).emit('receive message', {
                    message: message,
                    from: socket.id
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}