import { useState, useCallback } from 'react';
import { usePost } from '@/hooks/useRequest';
import type { SignInDto } from '@/lib/api/generated/Api';

interface User {
  id: string;
  name: string;
  department: string;
  wallet_address: string;
  student_number: string;
  request_status: string;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { postData, isLoading } = usePost<AuthResponse, SignInDto>();

  const signIn = useCallback(async (data: SignInDto) => {
    try {
      const response = await postData('/auth/sign-in', data);
      
      if (response) {
        localStorage.setItem('accessToken', response.access_token);
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
      throw err;
    }
  }, [postData]);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut
  };
}