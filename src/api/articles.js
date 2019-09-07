import request from '@/utils/request'

export const getArticles = ({
  // 频道id
  channel_id: channelId, // 格式不支持 '_' == 需要赋值才可操作
  // 当前时间戳
  timestamp,
  // 是否包含置顶 - 1置顶 ，0不包含置顶
  with_top: withTop // 格式不支持 '_' == 需要赋值才可操作
}) => {
  return request.get('/app/v1_1/articles', {
    // 返回值是Query | params对象
    params: {
      // 频道id
      channelId,
      // 当前时间戳
      timestamp,
      // 是否包含置顶 - 1置顶 ，0不包含置顶
      withTop
    }
  })
}
