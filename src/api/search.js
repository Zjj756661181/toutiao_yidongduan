import request from '@/utils/request'

// 获取搜索建议 /app/v1_0/suggestion'
export const getSuggestion = (q) => {
  return request.get('/app/v1_0/suggestion', {
    params: {
      q
    }
  })
}

// 获取搜索结果 /app/v1_0/search
export const getSearch = ({
  page, // 页数，不传默认为1
  perPage, // 每页数量
  q // 搜索关键词
}) => {
  return request.get('/app/v1_0/search', {
    params: {
      page, // 页数，不传默认为1
      per_page: perPage, // 每页数量
      q: q// 搜索关键词
    }
  })
}

// 获取搜索历史 /app/v1_0/search/histories
// export const userSearchHistories = () => {
//   return request.get('/app/v1_0/user/histories')
// }
