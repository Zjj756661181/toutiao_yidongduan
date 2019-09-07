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

// 删除用户指定的频道
export const deleteChannel = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}

// 添加用户的指定频道
// id 频道的id， seq是当前项的序号
export const addChannel = (id, seq) => {
  return request.patch('/app/v1_0/user/channels', {
    channels: [
      {
        id,
        seq
      }
    ]
  })
}
