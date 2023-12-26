import { config as loadLocalEnvironment } from 'dotenv'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
loadLocalEnvironment({ path: __dirname + '/../secrets/environment' })
let config = {
    jwtsecret: '',
    sesdel: parseInt(process.env.SESDEL) | 480,
    mongo: `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_HOST}/Bot?retryWrites=true&w=majority`,
    port: process.env.PORT,
    mode: process.env.MODE,
    smtp: {
        user: process.env.SMTP_USER,
        server: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        key: process.env.SMTP_KEY,
        email: process.env.SMTP_EMAIL
    }
}
console.log(config)

export default config