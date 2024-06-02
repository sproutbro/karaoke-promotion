import { Server } from "socket.io";

export default function socketIO(server) {
    // Socket.IO 서버 생성
    const io = new Server(server);

    // 소켓 연결 이벤트 처리
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}