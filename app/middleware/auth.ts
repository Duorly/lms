export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie('auth_token')
  
  if (!authCookie.value) {
    return navigateTo('/login')
  }
})
