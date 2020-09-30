import request from '@/utils/request';
//获取电影信息列表
export function getMovieList(params){
  return request({
    url: '/api/movie/movieList',
    method: 'get',
    params,
    cache:false
  })
}
//新增电影信息
export function addmovie(data){
  return request({
    url: '/api/movie/addmovie',
    method: 'post',
    data,
  })
}
//根据id获取某个电影详情
export function getMovieById(data){
  return request({
    url: '/api/movie/getMovieById',
    method: 'post',
    data,
  })
}
//删除某个电影信息
export function removemovie(data){
  return request({
    url: '/api/movie/removemovie',
    method: 'post',
    data,
  })
}
//修改某个电影信息
export function updateMovie(data){
  return request({
    url: '/api/movie/updateMovie',
    method: 'post',
    data,
  })
}