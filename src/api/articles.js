import request from '@/utils/request'

// 获取文章列表
export const getArticles = ({
  // 频道id
  channelId,
  // 当前时间戳
  timestamp,
  // 是否包含置顶 - 1置顶 ，0不包含置顶
  withTop
}) => {
  return request.get('/app/v1_1/articles', {
    // 返回值是Query | params对象
    params: {
      // 频道id
      channel_id: channelId, // 格式不支持 '_' == 需要赋值才可操作
      // 当前时间戳
      timestamp,
      // 是否包含置顶 - 1置顶 ，0不包含置顶
      with_top: withTop// 格式不支持 '_' == 需要赋值才可操作
    }
  })
}

// 不感兴趣 /app/v1_0/article/dislikes/:target
export const dislikeArticles = (id) => {
  // 返回id
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
