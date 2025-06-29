export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie('access_token');
  const refreshToken = useCookie('refresh_token');

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!accessToken.value && !refreshToken.value) {
    return navigateTo('/auth/login');
  }
}); 