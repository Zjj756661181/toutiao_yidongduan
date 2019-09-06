// 存储本地信息
export const setItem = (key, item) => {
  // 将信息转为字符串存储本地
  window.localStorage.setItem(key, JSON.stringify(item))
}
// 获取本地信息
export const getItem = (key) => {
  // JSON中存储为字符串 获取时需转换为对象
  return JSON.parse(window.localStorage.getItem(key))
}
// 删除本地信息
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
