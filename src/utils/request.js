import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建axios实例，设置不同的baseURL ------------------
const instance = axios.create({
  timeout: 3000,
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 大数字处理 在响应拦截之前处理 ---------------------
// 获取到服务器返回的数据，并在处理数据之前处理
// transformResponse
instance.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的JSON数据字符串，否则会导致JSONbig.parse(data) 的转换失败|报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换数据直接原因返回
    return data
  }
}]
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
  // 接口返回的数据中都有data，此处统一返回接口返回的data
  // 如果接口返回的数据中没有data，此时返回axios响应对象的data属性
  return response.data.data || response.data
}, function (error) {
  // Do something with response error === 处理响应错误
  return Promise.reject(error)
})

// 导出
export default instance
