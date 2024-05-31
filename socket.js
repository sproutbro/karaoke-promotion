import fs from "fs";
import express from "express";
import { createServer } from 'node:https';
import { Server } from "socket.io";

const app = express();

// SSL 인증서 파일 경로
const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CRT_PATH)
};

// HTTPS 서버 생성
const server = createServer(options, app);

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

server.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});