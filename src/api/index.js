import { login, sendSms } from '@/api/login'
import { myInfo } from '@/api/myInfo'
import { followings, articles } from '@/api/followings'

export const loginApi = login
export const sendSmsApi = sendSms
export const myInfoApi = myInfo
export const followingsApi = followings
export const articlesApi = articles