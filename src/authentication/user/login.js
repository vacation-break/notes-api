import asciiCaptcha from 'ascii-captcha'

import { randomString } from '../../library/encryption.js'
import config from '../../config.js'
import Authentication from '../../proto/authentication_pb.js'
import { session } from '../../session/db.js'
import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: config.smtp.server,
    port: config.smtp.port,
    secure: true,
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: true
    },
    auth: {
        user: config.smtp.user,
        pass: config.smtp.key,
    },
});

async function mail(subject, text, callback) {
    const mailOptions = {
        from: config.smtp.email,
        to: config.smtp.user,
        subject: subject,
        text: text // change to html later
    };
    await transporter.sendMail(mailOptions, callback);
}


async function login(call, callback) {
    const request = call.request
    const response = new Authentication.Empty();
    /* mail("Hello", "Hi", (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); */
    let user = await new Promise((resolve, reject) => {

        session.update({
            uuid: request.getToken(), // handle expired token spearately
            captcha: request.getCaptcha(),
        }, {
            $set: {
                expire: prevExpire + 3 * 60 * 1000,
                verification_code: randomString(6)
            }
        }, (err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
    });
    callback(null, response)
}
export default login