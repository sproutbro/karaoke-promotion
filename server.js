import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import { handler } from "./build/handler.js";
import socketIO from "./socket.js";
import { Server } from "socket.io";
import dotenv from 'dotenv';
dotenv.config();

// SSL 인증서 파일 경로
const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CRT_PATH)
};

// Express 애플리케이션 생성
const app = express();

// HTTP 요청을 HTTPS로 리다이렉트하는 미들웨어 추가
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

// 모든 요청을 SvelteKit 핸들러로 라우팅
app.use(handler);

// HTTPS 서버 생성
const httpsServer = https.createServer(options, app);

// HTTP 서버 생성 (모든 요청을 HTTPS로 리다이렉트)
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
    res.end();
});

// Socket.io 서버 설정 (HTTPS 서버 사용)
const io = new Server(httpsServer);
socketIO(io);

// HTTPS 서버 실행
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

// HTTP 서버 실행 (리다이렉트 전용)
httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80, redirecting to HTTPS');
});