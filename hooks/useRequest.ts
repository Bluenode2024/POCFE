import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import { api } from '@/lib/api/axios';  // 기존 axios 인스턴스 사용

interface RequestState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

// GET 요청을 위한 훅
export function useGet<T = any>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const fetchData = async (url: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response: AxiosResponse<T> = await api.get(url);
      setState({ data: response.data, error: null, isLoading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
      throw error;
    }
  };

  return { ...state, fetchData };
}

// POST 요청을 위한 훅
export function usePost<T = any, D = any>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const postData = async (url: string, data?: D) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response: AxiosResponse<T> = await api.post(url, data);
      setState({ data: response.data, error: null, isLoading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
      throw error;
    }
  };

  return { ...state, postData };
}

// PUT 요청을 위한 훅
export function usePut<T = any, D = any>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const putData = async (url: string, data?: D) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response: AxiosResponse<T> = await api.put(url, data);
      setState({ data: response.data, error: null, isLoading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
      throw error;
    }
  };

  return { ...state, putData };
}

// PATCH 요청을 위한 훅
export function usePatch<T = any, D = any>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const patchData = async (url: string, data?: D) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response: AxiosResponse<T> = await api.patch(url, data);
      setState({ data: response.data, error: null, isLoading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
      throw error;
    }
  };

  return { ...state, patchData };
}

// DELETE 요청을 위한 훅
export function useDelete<T = any>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const deleteData = async (url: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const response: AxiosResponse<T> = await api.delete(url);
      setState({ data: response.data, error: null, isLoading: false });
      return response.data;
    } catch (error) {
      setState({ data: null, error: error as Error, isLoading: false });
      throw error;
    }
  };

  return { ...state, deleteData };
} 