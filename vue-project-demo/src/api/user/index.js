import request from '@/utils/request'

// 查询用户列表
export function getUserListApi(data) {
    return request({
        url: "/user/user/all",
        method: "post",
        data
    })
}

// 查询用户详情
export function getUserInfoApi(data) {
    return request({
        url: "/user/user/info",
        method: "post",
        data
    })
}

// 新增用户
export function addUserApi(data) {
    return request({
        url: "/user/user/add",
        method: "post",
        data
    })
}

// 编辑用户
export function editUserApi(data) {
    return request({
        url: "/user/user/update",
        method: "post",
        data
    })
}

// 修改用户状态
export function updateUserStatusApi(data) {
    return request({
        url: "/user/user/update/status",
        method: "post",
        data
    })
}

// 获取用户角色
export function getUserRoleApi(data) {
    return request({
        url: "/user/user/role/list",
        method: "post",
        data
    })
}

// 新增用户角色
export function addUserRoleApi(data){
    return request({
        url: "/user/user/role/add",
        method: "post",
        data
    })
}

// 获取所有的角色
export function getAllRoleApi(data) {
    return request({
        url: "/user/role/all",
        method: "post",
        data
    })
}