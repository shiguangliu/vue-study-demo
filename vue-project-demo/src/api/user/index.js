import request from '@/utils/request'

// 查询用户列表
export function getUserListApi(data) {
    return request({
        url: "/user/list",
        method: "post",
        data
    })
}

// 查询用户详情
export function getUserInfoApi(data) {
    return request({
        url: "/user/info",
        method: "post",
        data
    })
}

// 新增用户
export function addUserApi(data) {
    return request({
        url: "/user/add",
        method: "post",
        data
    })
}

// 编辑用户
export function editUserApi(data) {
    return request({
        url: "/user/edit",
        method: "post",
        data
    })
}

// 修改用户状态
export function updateUserStatusApi(data) {
    return request({
        url: "/user/status",
        method: "post",
        data
    })
}