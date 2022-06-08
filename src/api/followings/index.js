import request from "@/utils/request.js";
// 获取文章频道列表api
export const followings = () => {
    return request({
        url: "/v1_0/user/channels",
        method: "GET",
    })
}
//获取文章内容列表
export const articles = params => {
    return request({
        url: '/v1_0/articles',
        method: 'GET',
        params
    })
}