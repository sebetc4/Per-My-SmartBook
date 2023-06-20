import crypto from 'crypto';
import { EncryptedKey } from '../../../packages/types';

const encryptionKey = process.env.ENCRYPTION_KEY!;

export const generateRandomBytes = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');

export const hashData = (data: crypto.BinaryLike) => crypto.createHash('sha256').update(data).digest('hex')

export const encryptKey = (key: string) => {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(key);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedKey: encrypted.toString('hex') };
};

export const decryptKey = (data: EncryptedKey) => {
    let iv = Buffer.from(data.iv, 'hex');
    let encryptedText = Buffer.from(data.encryptedKey, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
