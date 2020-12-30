import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
// import { userInfo } from '@/services/user'
const request = axios.create({
})

function routerToLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({ refreshtoken: store.state.user.refresh_token })
  })
}

let isRfreshing = false
const resquests: any[] = []
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = store.state.user
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    const { status } = error.response
    if (status === 401) {
      // Message.error('请求参数错误')
      // 请求错误，token过期或者没有token
      // 重新进行请求
      // 如果没有user信息直接到登录页面并且报错
      if (!store.state.user) {
        routerToLogin()
        return Promise.reject(error)
      }

      if (!isRfreshing) {
        isRfreshing = true
        return refreshToken().then(res => {
          // token 刷新成功后重新进行token的设置
          store.commit('setUser', res.data.content)
          resquests.forEach(cb => cb())
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('clearUser', null)
          routerToLogin()
          return Promise.reject(err)
        })
      }
      return new Promise(resolve => {
        resquests.push(() => {
          resolve(request(error.config))
        })
      })
      // 使用resttoken 进行重新发送token刷新请求
      // 成功 --> 更新store中的user
      // 失败 --> 清空store中的user
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    // 一些其他的错误
    Message.error(`请求失败: ${error.message}`)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request