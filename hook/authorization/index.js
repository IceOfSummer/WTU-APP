const AUTHORIZATION_KEY = 'authorization'
export const saveAuthorizationToken = (token) => uni.setStorage({
  key: AUTHORIZATION_KEY,
  data: token
})

export const getAuthorizationToken = () => uni.getStorageSync(AUTHORIZATION_KEY)
