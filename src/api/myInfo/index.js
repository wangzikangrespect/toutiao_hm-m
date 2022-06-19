import request from '@/utils/request'
//用户信息
export const myInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
    })
}
//用户个人资料
export const perInfo = () => {
    return request({
        url: '/v1_0/user/profile',
        method: "GET"
    })
}
//编辑个人信息
export const editUserInfo = data => {
    return request({
        url: '/v1_0/user/profile',
        method: 'PATCH',
        data
    })
}
//更新个人头像
export const updateMyPhoto = data => {
    return request({
        url: '/v1_0/user/photo',
        method: "PATCH",
        data
    })
}