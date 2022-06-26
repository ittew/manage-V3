/** 
 * axios 二次封装
*/
import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '../config'
import router from '../router'

const TOKEN_INVAILD = "Token认证失败, 请重新登录"
const NETWORK_ERROR = "网络请求异常, 请稍后重试"

// 创建axios实例对象, 添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 5000
})

//请求拦截
service.interceptors.request.use(req => {
    const headers = req.headers
    if (!headers.Authorization) headers.Authorization = 'Bear Jack' 
    return req
})

// 响应拦截
service.interceptors.response.use(res => {
    const { code, data, msg } = res.data
    if (code === 200) {
        return data
    } else if (code === 50001) {
        ElMessage.error(TOKEN_INVAILD)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVAILD)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

/** 
 * 请求核心函数
 * options { url: '/nation', data: { name: 'jack'}, methods: 'get'}}
*/
// 访问方式一 this.$request({ url: '/nation', data: { name: 'jack' }).then(res => {})
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }

    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }

    return service(options)
}
// 访问方式二 this.$request.get('/nation', {name: 'jack'}).then(res => {})
['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data, 
            methods: item,
            ...options,
        })
    }
})

export default request