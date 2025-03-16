import axios from 'axios';
import { getAccessToken } from '@/utils/auth';

// axios 인스턴스 생성
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 에러 처리 (토큰 만료 등)
    if (error.response?.status === 401) {
      // 로그아웃 처리 또는 토큰 갱신 로직
    }
    return Promise.reject(error);
  }
); 