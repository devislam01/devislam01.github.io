export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  if (!window.location.pathname.includes('/login')) {
    window.location.href = '/login';
  }
  console.log('inside logout')
}
