import request from '@/utils/request';
//新增反馈信息
export function addfeedback(data){
  return request({
    url: '/api/feedback/add',
    method: 'post',
    data,
  })
}