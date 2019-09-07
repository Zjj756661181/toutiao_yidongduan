import request from '@/utils/request'

/**
 * 获取频道列表
 * 1.用户登录，获取用户登录列表
 * 2.用户不登录，获取默认列表(不强制用户登录)
 */
export const getUserChannels = () => {
  return request.get('/app/v1_0/user/channels')
}

// 获取所有频道
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
