import request from '@/utils/request'

// 登录账号相关服务API路由
const USER_URL = process.env.VUE_APP_USER_API

// 查询题库列表
export function listTopic(data) {
  return request({
    url: USER_URL + '/brush/topic/list',
    method: 'post',
    data
  })
}

// 题库详情
export function getTopic(data) {
  return request({
    url: USER_URL + '/brush/topic/info',
    method: 'post',
    data
  })
}

// 新增题库
export function addTopic(data) {
  return request({
    url: USER_URL + '/brush/topic/add',
    method: 'post',
    data
  })
}

// 修改题库
export function updTopic(data) {
  return request({
    url: USER_URL + '/brush/topic/upd',
    method: 'post',
    data
  })
}

// 修改题库状态
export function updTopicStatus(data) {
  return request({
    url: USER_URL + '/brush/topic/upd/status',
    method: 'post',
    data
  })
}

// 删除题库
export function delTopic(data) {
  return request({
    url: USER_URL + '/brush/topic/del',
    method: 'post',
    data
  })
}

// 批量删除题库
export function delIdsTopic(data) {
  return request({
    url: USER_URL + '/brush/topic/del/batch',
    method: 'post',
    data
  })
}
