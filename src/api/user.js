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

// 关注用户 /app/v1_0/user/followings  body / target: id
export const FollowUser = (id) => {
  return request.post('/app/v1_0/user/followings', {
    // 参数id
    target: id
  })
}

// 取消关注用户 /app/v1_0/user/followings/:target  路径参数 / target: id
export const unFollowUser = (id) => {
  return request.delete(`/app/v1_0/user/followings/${id}`)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/app/v1_0/user')
}

// 获取用户的个人资料
export const getUserProfile = () => {
  return request.get('/app/v1_0/user/profile')
}

// 上传图片 [用户个人资料 头像]
export const UploadPhoto = (key, file) => {
  // 在上传文件的时候
  const formData = new FormData()
  formData.append(key, file)
  return request.patch('/app/vl_0/user/photo', formData)
}

// 获取关注用户列表
export const getFollowings = ({
  page,
  perPage
}) => {
  return request.get('/app/v1_0/user/followings', {
    params: {
      page,
      per_page: perPage
    }
  })
}

// 获取粉丝用户列表
export const getFollowers = ({
  page,
  perPage
}) => {
  return request.get('/app/v1_0/user/followers', {
    params: {
      page,
      per_page: perPage
    }
  })
}
