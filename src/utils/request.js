import axios from 'axios'

// 创建axios实例，设置不同的baseURL ------------------
const instance = axios.create({
  timeout: 3000,
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器 ---------------------------------------
// Add a request interceptor === 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // Do something before request is sent === 在发出请求前做
  return config
}, function (error) {
  // Do something with request error === 处理请求错误
  return Promise.reject(error)
})

// 响应拦截器 ---------------------------------------
// Add a response interceptor === 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // Do something with response data === 处理响应数据
  return response
}, function (error) {
  // Do something with response error === 处理响应错误
  return Promise.reject(error)
})

// 导出
export default instance
