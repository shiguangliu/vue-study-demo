import request from '@/utils/request'

// 登录账号相关服务API路由
const USER_URL = process.env.VUE_APP_USER_API

// 查询题库列表
export function randomExam(data) {
  return request({
    url: USER_URL + '/safety/officer/random/exam',
    method: 'post',
    data
  })
}

// 题库详情
export function checkAnswer(data) {
  return request({
    url: USER_URL + '/safety/officer/check/answer',
    method: 'post',
    data
  })
}
