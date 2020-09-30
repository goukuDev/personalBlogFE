import { JSEncrypt } from 'jsencrypt'
export default function setEncrypt (str) {
  const key = `-----BEGIN PUBLIC KEY-----
  MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJvfX4qFwX43jJjPhljhUYUSGzyJLP+0
  C/Sml2Yjw1lUnIgOK6gS/xsOIAV1XvNtQs7v2LxwUpOi7Qui5Nou3xUCAwEAAQ==
  -----END PUBLIC KEY-----`
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(key)
  return jsencrypt.encrypt(str)
}