import request from '@/utils/request';

//注册
export function register(data){
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}
//检查是否已登录
export function isLogin(params){
  return request({
    url: '/api/user/isLogin',
    method: 'get',
    params,
    cache:false
  })
}
//登录
export function login(data){
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}
//忘记密码
export function forget(data){
  return request({
    url: '/api/user/forget',
    method: 'post',
    data
  })
}
//获取用户列表
export function getUserList(params){
  return request({
    url: '/api/user/userList',
    method: 'get',
    params,
    cache:false
  })
}