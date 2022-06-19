import request from "@/utils/request";

export const getSearchSuggestion = params => {
    return request({
        url: '/v1_0/suggestion',
        method: 'GET',
        params
    })
}
export const getSearchResultS = params => {
    return request({
        url: '/v1_0/search',
        method: 'GET',
        params
    })
}