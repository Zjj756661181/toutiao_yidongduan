import request from '@/utils/request'

/**
 *
 * @param {*} 登录提交服务器的数据
 */

// 登录获取数据信息
export const login = ({
  mobile,
  code
}) => {
  return request.post('/app/v1_0/authorizations', {
    mobile,
    code
  })
}

/**
 * 拉黑作者 用户操作 返回值id 作者id
 */
export const blacklists = (id) => {
  // 返回id
  return request.post('/app/v1_0/user/blacklists', {
    target: id
  })
}
