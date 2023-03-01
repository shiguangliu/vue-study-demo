import request from '@/utils/request'

// 后台服务API路由
const USER_URL = process.env.VUE_APP_BASE_API

// 查询所有
export function allDict(data) {
  return request({
    url: USER_URL + '/sys_dict/all',
    method: 'post',
    data
  })
}

// 查询列表
export function listDict(data) {
  return request({
    url: USER_URL + '/sys_dict/list',
    method: 'post',
    data
  })
}

// 详情
export function infoDict(data) {
  return request({
    url: USER_URL + '/sys_dict/info',
    method: 'post',
    data
  })
}

// 新增
export function addDict(data) {
  return request({
    url: USER_URL + '/sys_dict/add',
    method: 'post',
    data
  })
}

// 修改
export function updDict(data) {
  return request({
    url: USER_URL + '/sys_dict/upd',
    method: 'post',
    data
  })
}

// 修改状态
export function updDictStatus(data) {
  return request({
    url: USER_URL + '/sys_dict/upd/status',
    method: 'post',
    data
  })
}

// 删除
export function delDict(data) {
  return request({
    url: USER_URL + '/sys_dict/del',
    method: 'post',
    data
  })
}

// 批量删除
export function delBatchDict(data) {
  return request({
    url: USER_URL + '/sys_dict/del/batch',
    method: 'post',
    data
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete'
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  })
}