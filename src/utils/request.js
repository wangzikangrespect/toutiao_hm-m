import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/'
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
