import crypto from 'crypto'

export function randomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(length);
}

export function encrypt(data, key) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    const ciphertext = cipher.update(data)
    const encryptedData = Buffer.concat([iv, ciphertext, cipher.final])
    return encryptedData.toString('',);
}
export function decrypt(data, key) {
    data = Buffer.from(data, 'hex')
    const iv = data.slice(0, 16)
    data = data.slice(16)
    const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return Buffer.concat([cipher.update(data), cipher.final()]).toString();
}