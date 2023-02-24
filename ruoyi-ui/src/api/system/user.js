import request from '@/utils/request'

// 后台服务API路由
const USER_URL = process.env.VUE_APP_BASE_API

// 查询用户列表
export function listUser(data) {
  return request({
    url: USER_URL + '/user/list',
    method: 'post',
    data
  })
}

// 用户详情
export function getUser(data) {
  return request({
    url: USER_URL + '/user/get',
    method: 'post',
    data
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: USER_URL + '/user/add',
    method: 'post',
    data
  })
}

// 新增用户
export function updUser(data) {
  return request({
    url: USER_URL + '/user/update',
    method: 'post',
    data
  })
}

// 修改用户状态
export function updUserStatus(data) {
  return request({
    url: USER_URL + '/user/update/status',
    method: 'post',
    data
  })
}

// 重置密码
export function resetUserPwd(data) {
  return request({
    url: USER_URL + '/user/reset/password',
    method: 'post',
    data
  })
}

// 删除用户
export function delUser(data) {
  return request({
    url: USER_URL + '/user/delete',
    method: 'post',
    data
  })
}

// 批量删除用户
export function batchDelUser(data) {
  return request({
    url: USER_URL + '/user/batch/delete',
    method: 'post',
    data
  })
}

// 用户绑定角色
export function userBindRole(data) {
  return request({
    url: USER_URL + '/user/role/bind/roles',
    method: 'post',
    data
  })
}

// 更新当前登录用户信息
export function updateInfo(data) {
  return request({
    url: USER_URL + '/user/update/info',
    method: 'post',
    data
  })
}

// // 查询用户列表
// export function listUser(query) {
//   return request({
//     url: '/system/user/list',
//     method: 'get',
//     params: query
//   })
// }


// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: '/system/user/authRole/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/user/authRole',
    method: 'put',
    params: data
  })
}
