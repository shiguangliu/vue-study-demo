import request from '@/utils/request'

// 后台服务API路由
const USER_URL = process.env.VUE_APP_BASE_API

// 查询所有权限
export function all(data) {
  return request({
    url: USER_URL + '/role/all',
    method: 'post',
    data
  })
}

// 查询角色列表
export function list(data) {
  return request({
    url: USER_URL + '/role/list',
    method: 'post',
    data
  })
}

// 角色详情
export function getInfo(data) {
  return request({
    url: USER_URL + '/role/info',
    method: 'post',
    data
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: USER_URL + '/role/add',
    method: 'post',
    data
  })
}

// 修改角色
export function updRole(data) {
  return request({
    url: USER_URL + '/role/upd',
    method: 'post',
    data
  })
}

// 修改角色状态
export function updStatus(data) {
  return request({
    url: USER_URL + '/role/upd/status',
    method: 'post',
    data
  })
}

// 删除角色
export function delRole(data) {
  return request({
    url: USER_URL + '/role/del',
    method: 'post',
    data
  })
}

// 批量删除角色
export function batchDelRole(data) {
  return request({
    url: USER_URL + '/role/batch/del',
    method: 'post',
    data
  })
}

// 根据权限id查询当前权限下的所有用户
export function userList(data) {
  return request({
    url: USER_URL + '/user/role/user/list',
    method: 'post',
    data
  })
}

// 根据权限id查询未绑定的用户
export function unbindUserList(data) {
  return request({
    url: USER_URL + '/user/role/user/unbind/list',
    method: 'post',
    data
  })
}

// 角色绑定用户
export function bind(data) {
  return request({
    url: USER_URL + '/user/role/user/bind',
    method: 'post',
    data
  })
}

// 取消用户角色
export function cancel(data) {
  return request({
    url: USER_URL + '/user/role/cancel',
    method: 'post',
    data
  })
}

// 批量取消用户角色
export function batchCancel(data) {
  return request({
    url: USER_URL + '/user/role/batch/cancel',
    method: 'post',
    data
  })
}

// 查询权限树
export function authList(data) {
  return request({
    url: USER_URL + '/auth/menu/auth/list',
    method: 'post',
    data
  })
}

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/system/role/authUser/cancel',
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/system/role/authUser/selectAll',
    method: 'put',
    params: data
  })
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
  return request({
    url: '/system/role/deptTree/' + roleId,
    method: 'get'
  })
}
