import request from '@/utils/request'

// 登录账号相关服务API路由
const USER_URL = process.env.VUE_APP_USER_API

// 查询题库列表
export function questionRandomExam(data) {
  return request({
    url: USER_URL + '/wrong/question/resit/exam',
    method: 'post',
    data
  })
}

// 题库详情
export function questionCheckAnswer(data) {
  return request({
    url: USER_URL + '/wrong/question/check/answer',
    method: 'post',
    data
  })
}
