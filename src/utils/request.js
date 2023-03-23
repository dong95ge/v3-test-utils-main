import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// request拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// response拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      console.log('错误：' + res.msg);
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('错误：' + error);
    return Promise.reject(error);
  }
);

const request = {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, data) {
    return instance.post(url, data);
  },
  put(url, data) {
    return instance.put(url, data);
  },
};

export default request;