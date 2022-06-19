import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
// import jsonBig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/',

    // transformResponse 允许自定义原始的响应数据（字符串）
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return jsonBig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
})

request.interceptors.request.use(function (config) {  //挂载axios拦截器
    const user = store.state.user //声明user的值方便调用其中的token
    if (user && user.token) { //判断user有值，并且其中token的值不为空，则执行函数
        config.headers.Authorization = `Bearer ${user.token}`  //config代表发送axios的配置
    }
    return config
}), function (err) {
    return Promise.reject(err)
}

export default request
