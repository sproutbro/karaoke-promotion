import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from '$env/static/private';

// Gmail SMTP 서버 설정
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'krsproutbro@gmail.com',
        pass: EMAIL_PASSWORD
    }
});

// 이메일 전송
function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

let timeData = {};
// 한시간한번 발생
function isFirstEventInAnHour(eventKey) {
    const email = eventKey.userId;
    const currentTime = new Date().getTime();
    const message = eventKey.content;

    // timeData 에 유저가 저장되어있지 않으면 저장시기고 sendMail
    if (!timeData[email] || (currentTime - timeData[email]) > 3600000) {
        // 이메일 옵션
        let mailOptions = {
            from: '"bb-code" <krsproutbro@gmail.com>', // 보내는 사람
            to: 'krsproutbro@gmail.com', // 받는 사람
            subject: '실시간 메세지 왔다', // 이메일 제목
            text: ``, // 평문 본문
            html: `<p>${email} : ${message}</P>
                <a href="https://bucheon.store/admin">사이트이동</a>` // HTML 본문
        };
        timeData[email] = currentTime;
        sendMail(mailOptions);
    }
}

export { isFirstEventInAnHour };