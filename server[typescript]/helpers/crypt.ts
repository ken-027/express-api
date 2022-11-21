import { APP_KEY } from '@config'
import { cryptojs, bcryptjs } from '@modules'

// const salt = cryptojs.lib.WordArray.random(128 / 8)

export const md5 = (message: string): string => cryptojs.HmacMD5(message, APP_KEY).toString(cryptojs.enc.HEX)

// export const hash = (message: string): string => cryptojs.SHA256(message).toString(cryptojs.enc.Base64)
export const hash = (message: string): string => cryptojs.SHA3(message, { outputLenght: 256 }).toString(cryptojs.enc.Base64)

export const compare = async (message: string, hashed: string): Promise<boolean> => bcryptjs.compare(message, hashed)

export const encrypt = (message: string): string => cryptojs.RC4.encrypt(message, APP_KEY).toString()

export const decrypt = (encryptedMessage: string): string => cryptojs.RC4.decrypt(encryptedMessage, APP_KEY).toString(cryptojs.enc.Utf8)

export const progressiveHash = (message: string) => {
	const sha256 = cryptojs.algo.SHA256.create()
	sha256.update(message)
	sha256.update(message + '0')
	sha256.update(message + '1')
	return sha256.finalize().toString(cryptojs.enc.HEX)
}

export const pbkdf2 = (message: string): string => cryptojs.PBKDF2(message, cryptojs.lib.WordArray.random(128 / 8), {
	keySize: 128 / 32,
}).toString(cryptojs.enc.HEX)

export const hashFile = (name: string): string => cryptojs.PBKDF2(name, cryptojs.lib.WordArray.random(128 / 8), {
	keySize: 256 / 32,
}).toString(cryptojs.enc.HEX)