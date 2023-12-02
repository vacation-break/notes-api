import fs from 'fs'
const env_pre = fs.readFileSync('./secrets/env_pre', { encoding: 'utf8' });
const key = fs.readFileSync('./secrets/keys/server.key').toString('base64');
const environment = `
${env_pre}
KEY=${key}
`
fs.writeFileSync('./secrets/environment', environment)
