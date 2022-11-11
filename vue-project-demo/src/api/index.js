import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/:8090';

// 请求拦截器
axios.interceptors.request.use(config => {
    return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
    return res
},err => {
    return Promise.reject(err)
})

export default axios;