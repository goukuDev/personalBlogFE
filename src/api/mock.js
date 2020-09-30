import request from '@/utils/request';
//获取mock模拟数据
export function getMockData(){
  return request({
    url: '/api/mock/mockdata',
    method: 'get'
  })
}