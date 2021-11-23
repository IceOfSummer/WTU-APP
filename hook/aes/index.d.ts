export interface AesStatic {
  encrypt(secret, aesEncryptPassword, iv): string
}

export interface RandomIv {
  randomStr(length: number): string
}

export interface WtuEncrypt {
  wtuEncrypt(password, secret): string
}

declare const encrypt: AesStatic
export const randomStr: RandomIv
export const wtuEncrypt: WtuEncrypt
export default encrypt

