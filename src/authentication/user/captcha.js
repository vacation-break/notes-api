import asciiCaptcha from 'ascii-captcha'

import { randomString } from '../../library/encryption.js'
import config from '../../config.js'
import Authentication from '../../proto/authentication_pb.js'
import { session } from '../../session/db.js'




async function captcha(call, callback) {
    console.log("reach")
    const request = call.request
    const response = new Authentication.CaptchaResponse()
    let rand = "";
    let captchaText = "";
    function update(a) {
        console.log(a)
        rand = a;
    }
    let prevExpire = 0;

    let user = await new Promise((resolve, reject) => {
        rand = randomString(8);
        console.log(rand);
        session.update({ uuid: request.getToken() }, {
            $set: {
                captcha: rand,
                expire: prevExpire + 3 * 60 * 1000
            }
        }, (err, docs) => {
            if (err) reject(err)
            resolve(docs)
        })
    });
    response.setCaptcha(await asciiCaptcha.word2Transformedstr(rand).toString())
    callback(null, response)
}
export default captcha 