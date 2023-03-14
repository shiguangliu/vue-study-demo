import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

const UserId = 'userId'

const UserName = 'userName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(userId) {
  return Cookies.set(UserId, userId)
}

export function getUserName() {
  return Cookies.get(UserName)
}

export function setUserName(userName) {
  return Cookies.set(UserName, userName)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}
