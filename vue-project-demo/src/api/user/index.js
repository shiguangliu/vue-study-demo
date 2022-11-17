import axios from '@/utils/request'

// 查询用户列表
export function getUserListApi(data) {
    return axios({
        url: "/user/list",
        method: "post",
        data
    })
}

// 新增用户
export function addUserApi(data) {
    return axios({
        url: "/user/add",
        method: "post",
        data
    })
}

// 编辑用户
export function editUserApi(data) {
    return axios({
        url: "/user/edit",
        method: "post",
        data
    })
}

// 修改用户状态
export function updateUserStatusApi(data) {
    return axios({
        url: "/user/status",
        method: "post",
        data
    })
}