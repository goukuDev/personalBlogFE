import axios from 'axios';
import {message} from 'antd';

const token = localStorage.getItem('token');

axios.defaults.headers['Content-Type'] = 'application/json';

const request = axios.create({
  baseURL : '',
  timeout : 10000,
});

const error = (error)=>{
  if (error.response.status === 401 && !!token) {
    message.error('登录过期,请重新登录');
    localStorage.removeItem('token');
    setTimeout(() => {
      location.reload();
    }, 1500)
  }else{
    message.error('服务器开小差了');
  }
  return Promise.reject(error);
}
request.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  },
  error
);
request.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response
  },
  error
);

export default request;