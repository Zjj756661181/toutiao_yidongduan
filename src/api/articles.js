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

// 不感兴趣 不喜欢 /app/v1_0/article/dislikes/:target
export const dislikeArticle = (id) => {
  // 返回id
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}

// 举报文章
export const reqortArticle = ({
  // 文章id
  target,
  // 举报类型：0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
  type
}) => {
  return request.post('/app/v1_0/article/reports', {
    target,
    type
  })
}

// 获取文章详情
export const getArticleDetail = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}

// 点赞  post('/app/v1_0/article/likings' )   Body / target: 文章id
export const liking = (id) => {
  return request.post('/app/v1_0/article/likings', {
    target: id
  })
}

// 取消点赞 delete(`/app/v1_0/article/likings/:target`)  路径参数 / target: id
export const unliking = (id) => {
  return request.delete(`/app/v1_0/article/likings/${id}`)
}

// 取消文章不喜欢 delete(` /app/v1_0/article/dislikes/:target`) 路径参数 / target: id
export const undislikeArticle = (id) => {
  return request.delete(`/app/v1_0/article/dislikes/${id}`)
}
