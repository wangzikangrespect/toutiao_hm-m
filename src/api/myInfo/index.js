import request from '@/utils/request'

export const myInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
    })

}