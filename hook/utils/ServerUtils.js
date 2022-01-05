export const getServerUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    // return 'http://192.168.1.105:8080'
    return 'http://xds.fit'
  } else {
    return 'http://xds.fit'
  }
}
