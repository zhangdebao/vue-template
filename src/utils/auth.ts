import Cookies from 'js-cookie'
const TokenKey = 'auth'

export function getToken (): string {
  return Cookies.get(TokenKey) || ''
}

export function setToken (token: string) {
  Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
