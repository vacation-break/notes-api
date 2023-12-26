import config from '../../config.js';
import Authentication from '../../proto/authentication_pb.js'
import { session } from '../../session/db.js'
import { randomUUID } from 'crypto'
function init(call, callback) {
    const request = call.request;
    const response = new Authentication.Token();
    const rand = randomUUID()
    session.insert([{
        expire: Date.now() + 3 * 60 * 1000,
        uuid: rand,
        requests: 1,
        email: '',
        captcha: '',
        captcha_no: 0,
        verification_code: '',
        ip: call.getPeer().split(":")[0]
    }])
    response.setToken(rand);
    callback(null, response);
}
export default init;