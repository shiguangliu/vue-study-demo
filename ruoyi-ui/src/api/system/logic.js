import request from '@/utils/request'

// 后台服务API路由
const USER_URL = process.env.VUE_APP_BASE_API

// 查询用户列表
export function allDictType(data) {
    return request({
      url: USER_URL + '/sys_dict_items/all',
      method: 'post',
      data
    })
  }
  