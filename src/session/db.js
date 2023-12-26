import Nedb from "nedb";
import { dirname } from 'path';
import config from '../config.js'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export var session;
export var identified_session;

if (config.mode == "dev") {
    session = new Nedb({ filename: __dirname + '/db/session', autoload: true });
    identified_session = new Nedb({ filename: __dirname + './db/identified-session', autoload: true });
} else {
    session = new Nedb({ /*filename: __dirname + '/db/session', */autoload: true, inMemoryOnly: true });
    identified_session = new Nedb({ /*filename: __dirname + './db/identified-session',*/ autoload: true, inMemoryOnly: true });
}
session.ensureIndex({ fieldName: 'uuid',/*expireAfterSeconds -doesn't work*/ })

//session.persistence.setAutocompactionInterval(3600 * 1000)


if (config.mode != "dev") {
    setInterval(() => {
        session.remove({ expire: { $lt: Date.now() } }, { multi: true })
    }, 1000 * 1000)
}