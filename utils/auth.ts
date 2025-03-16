// 로컬 스토리지 키 상수
const ACCESS_TOKEN_KEY = 'accessToken';

// 액세스 토큰 가져오기
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// 액세스 토큰 저장
export const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

// 액세스 토큰 삭제
export const removeAccessToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// 로그인 상태 확인
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
}; 