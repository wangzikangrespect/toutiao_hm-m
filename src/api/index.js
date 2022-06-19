import { login, sendSms } from '@/api/login'
import { myInfo, perInfo, editUserInfo, updateMyPhoto } from '@/api/myInfo'
import { followings, articles, getAllChannels, delChannel, addChannel } from '@/api/followings'
import { getSearchSuggestion, getSearchResultS } from '@/api/search'
import { getArticle, getFollow, deleteFollow, colArticle, cancelColArticle, likeArticle, cancelLikeArticle, getComment, likecomt, cancelLikecomt, postComments } from '@/api/articles'

export const loginApi = login
export const sendSmsApi = sendSms
export const myInfoApi = myInfo
export const followingsApi = followings
export const articlesApi = articles
export const getAllChannelsApi = getAllChannels
export const delChannelApi = delChannel
export const addChannelApi = addChannel
export const getSearchSuggestionApi = getSearchSuggestion
export const getSearchResultSApi = getSearchResultS
export const getArticleApi = getArticle
export const getFollowApi = getFollow
export const deleteFollowApi = deleteFollow
export const colArticleApi = colArticle
export const cancelColArticleApi = cancelColArticle
export const likeArticleApi = likeArticle
export const cancelLikeArticleApi = cancelLikeArticle
export const getCommentApi = getComment
export const likecomtApi = likecomt
export const cancelLikecomtApi = cancelLikecomt
export const postCommentsApi = postComments
export const perInfoApi = perInfo
export const editUserInfoApi = editUserInfo
export const updateMyPhotoApi = updateMyPhoto