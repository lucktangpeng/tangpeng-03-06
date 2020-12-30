import request from '@/utils/request'
import qs from 'qs'

interface Login {
    phone: string
    password: string
}

export const login = (data: Login) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}