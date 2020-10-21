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
//获取用户信息
export function getuser(params){
  return request({
    url: '/api/user/getuser',
    method: 'get',
    params,
    cache:false
  })
}
//更新个人信息
export function update(data){
  return request({
    url: '/api/user/update',
    method: 'post',
    data
  })
}
//替换用户头像
export function uploadimg(data){
  return request({
    url: '/api/user/upload',
    method: 'post',
    data
  })
}