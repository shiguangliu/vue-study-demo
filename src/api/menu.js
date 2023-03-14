import request from '@/utils/request'

// 登录账号相关服务API路由
const USER_URL = process.env.VUE_APP_USER_API

// 获取路由
export const getRouters = (data) => {
  return request({
    url: USER_URL + '/auth/menu/list',
    method: 'post',
    data
  })
}