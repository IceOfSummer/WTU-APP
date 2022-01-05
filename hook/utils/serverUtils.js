export const getServerUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://192.168.1.105:8081'
  } else {
    return 'http://xds.fit'
  }
}
