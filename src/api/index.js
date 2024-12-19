import axios from 'axios';

// 创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在这里可以添加token等通用处理
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 统一错误处理
    return Promise.reject(error);
  }
);

export const getHello = () => {
  return request.get('/hello');
};

export default request; 