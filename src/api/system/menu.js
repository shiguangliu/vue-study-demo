import request from '@/utils/request'

// 登录账号相关服务API路由
const USER_URL = process.env.VUE_APP_USER_API

// 查询菜单列表
export function listMenu(data) {
  return request({
    url: USER_URL + '/sys_menu/list',
    method: 'post',
    data
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: USER_URL + '/sys_menu/add',
    method: 'post',
    data
  })
}

// 菜单详情
export function getMenu(data) {
  return request({
    url: USER_URL + '/sys_menu/info',
    method: 'post',
    data
  })
}

// 新增菜单
export function updMenu(data) {
  return request({
    url: USER_URL + '/sys_menu/upd',
    method: 'post',
    data
  })
}

// 删除菜单
export function delMenu(data) {
  return request({
    url: USER_URL + '/sys_menu/del',
    method: 'post',
    data
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// // 查询菜单详细
// export function getMenu(menuId) {
//   return request({
//     url: '/system/menu/' + menuId,
//     method: 'get'
//   })
// }



// // 新增菜单
// export function addMenu(data) {
//   return request({
//     url: '/system/menu',
//     method: 'post',
//     data: data
//   })
// }

// // 修改菜单
// export function updateMenu(data) {
//   return request({
//     url: '/system/menu',
//     method: 'put',
//     data: data
//   })
// }

// // 删除菜单
// export function delMenu(menuId) {
//   return request({
//     url: '/system/menu/' + menuId,
//     method: 'delete'
//   })
// }