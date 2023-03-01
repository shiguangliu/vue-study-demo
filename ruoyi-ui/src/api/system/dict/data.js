import request from '@/utils/request'

// 后台服务API路由
const USER_URL = process.env.VUE_APP_BASE_API

// 查询列表
export function listDictItems(data) {
  return request({
    url: USER_URL + '/sys_dict_items/list',
    method: 'post',
    data
  })
}

// 详情
export function infoDictItems(data) {
  return request({
    url: USER_URL + '/sys_dict_items/info',
    method: 'post',
    data
  })
}

// 新增
export function addDictItems(data) {
  return request({
    url: USER_URL + '/sys_dict_items/add',
    method: 'post',
    data
  })
}

// 修改
export function updDictItems(data) {
  return request({
    url: USER_URL + '/sys_dict_items/upd',
    method: 'post',
    data
  })
}

// 修改状态
export function updDictItemsStatus(data) {
  return request({
    url: USER_URL + '/sys_dict_items/upd/status',
    method: 'post',
    data
  })
}

// 删除
export function delDictItems(data) {
  return request({
    url: USER_URL + '/sys_dict_items/del',
    method: 'post',
    data
  })
}

// 批量删除
export function delBatchDictItems(data) {
  return request({
    url: USER_URL + '/sys_dict_items/del/batch',
    method: 'post',
    data
  })
}







// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'delete'
  })
}
