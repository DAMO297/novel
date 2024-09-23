//获取文章分类
import request from '@/utils/request'
//获取文章分类
export const artGetChannelsService = async () => {
  return {
    data: {
      data: [
        { id: 1, cate_name: 'Category 1', cate_alias: 'cat1' },
        { id: 2, cate_name: 'Category 2', cate_alias: 'cat2' }
      ]
    }
  }
}
//添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
//编辑文章分类
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
//删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
export const artGetListService = (params) => {
  request.get('/my/article/list', { params })
  // return {
  //   data: {
  //     data: [
  //       {
  //         cate_name: 'Category 1',
  //         pub_date: '2022-07-10 14:53:52.602',
  //         state: '已发布'
  //       },
  //       {
  //         cate_name: 'Category 2',
  //         pub_date: '2022-07-10 14:53:52.601',
  //         state: '已发布'
  //       }
  //     ]
  //   }
  // }
}
