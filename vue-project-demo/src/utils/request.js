import axios from 'axios'
import Qs from 'qs'

const service = axios.create({
    baseURL: "http://localhost:8090"
    // timeout: 1000
})

// 添加请求拦截器
// 在发送请求前做些什么
service.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    if (config.method.toLowerCase() === 'post') {
        if (config.data) {
          config.data = {
            ...config.data,
            _t: Date.parse(new Date()) / 1000
          }
        }
        if (config.params) {
          config.data = Qs.stringify({
            ...config.params,
            _t: Date.parse(new Date()) / 1000
          })
          config.params = undefined
        }
      } else if (config.method.toLowerCase() === 'get') {
        config.params = {
          _t: Date.parse(new Date()) / 1000,
          ...config.params
        }
      }
    return config;
})

// 添加响应拦截器
service.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response.data;
}, err => {
    // 对响应错误做点什么
    return Promise.reject(err);
})

export default service;