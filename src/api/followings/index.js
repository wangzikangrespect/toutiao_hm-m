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
//获取全部列表
export const getAllChannels = () => {
    return request({
        url: '/v1_0/channels',
        method: "GET"
    })
}

//删除频道
export const delChannel = target => {
    return request({
        url: `/v1_0/user/channels/${target}`,
        method: 'DELETE'
    })
}
//添加频道
export const addChannel = channel => {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data: {
            channels: [channel]
        },
    })
}