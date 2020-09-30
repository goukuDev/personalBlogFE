import axios from 'axios';
import {message} from 'antd';

axios.defaults.headers['Content-Type'] = 'application/json';

const request = axios.create({
  baseURL : '',
  timeout : 10000,
});

const error = (error)=>{
  message.error('服务器开小差了');
  return Promise.reject(error);
}
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['Authorization'] = '';
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