import request from '@/utils/request'

// 登录账号相关服务API路由
const USER_URL = process.env.VUE_APP_USER_API

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: USER_URL + '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: USER_URL + '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })
}

// 获取用户详细信息
export function getInfo(data) {
  return request({
    url: USER_URL + '/user/info',
    method: 'post',
    data
  })
}

// 退出方法
export function logout(data) {
  return request({
    url: USER_URL + '/exit',
    method: 'post',
    data
  })
}

// 获取验证码
// export function getCodeImg() {
//   return request({
//     url: '/captchaImage',
//     headers: {
//       isToken: false
//     },
//     method: 'get',
//     timeout: 20000
//   })
// }