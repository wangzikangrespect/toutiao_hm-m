//导入dayjs
import Vue from 'vue'
import dayjs from 'dayjs'
//导入中文插件
import 'dayjs/locale/zh-cn'
//配置dayjs为中文
dayjs.locale('zh-cn')

//配置相对事件插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
//dayjs()获取当前最新时间
console.log(dayjs().format('YYYY-MM-DD'))

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})
