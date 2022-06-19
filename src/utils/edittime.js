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

Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})
