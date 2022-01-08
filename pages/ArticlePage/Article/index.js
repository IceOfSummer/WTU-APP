import appManual from './AppManual'
export default function (id) {
  if (typeof id === 'string') {
    id = Number.parseInt(id)
  }
  switch (id) {
    // APP使用说明
    case 0:
      return appManual
    default:
      return {
        title: '未找到该文章',
        html: '未找到该文章'
      }
  }
}
