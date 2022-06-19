import request from "@/utils/request";
import { method } from "lodash";
// 文章获取请求
export const getArticle = id => {
    return request({
        url: `/v1_0/articles/${id}`,
        method: 'GET'
    })
}
export const getFollow = data => {
    return request({
        url: '/v1_0/user/followings',
        method: 'POST',
        data
    })
}
export const deleteFollow = target => {
    return request({
        url: `/v1_0/user/followings/${target}`,
        method: "DELETE"
    })
}
// 收藏文章
export const colArticle = data => {
    return request({
        url: '/v1_0/article/collections',
        method: 'POST',
        data
    })
}
//取消收藏文章
export const cancelColArticle = target => {
    return request({
        url: `/v1_0/article/collections/${target}`,
        method: 'DELETE',
    })
}
//对文章点赞
export const likeArticle = data => {
    return request({
        url: '/v1_0/article/likings',
        method: "POST",
        data
    })
}
//取消点赞
export const cancelLikeArticle = target => {
    return request({
        url: `/v1_0/article/likings/${target}`,
        method: "DELETE"
    })
}
//获取文章评论或评论文章
export const getComment = params => {
    return request({
        url: '/v1_0/comments',
        method: 'GET',
        params
    })
}
//对评论或回复点赞
export const likecomt = data => {
    return request({
        url: '/v1_0/comment/likings',
        method: 'POST',
        data
    })
}
//取消对评论或回复点赞
export const cancelLikecomt = target => {
    return request({
        url: `/v1_0/comment/likings/${target}`,
        method: "DELETE"
    })
}
//评论或回复文章
export const postComments = data => {
    return request({
        url: '/v1_0/comments',
        method: "POST",
        data
    })
}