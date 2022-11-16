import axios from 'axios'

const service = axios.create({
    baseURL: "http://localhost:8010"
    // timeout: 1000
})

// 添加请求拦截器
// 在发送请求前做些什么
service.interceptors.request.use(config => {
    console.log(config)
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config;
})

// 添加响应拦截器
service.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
}, err => {
    // 对响应错误做点什么
    return Promise.reject(err);
})

export default service;