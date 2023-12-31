export const HttpErrorList: Record<string, string> = {
  1: '未知错误, 联系管理员(ys0514@yeah.net)排查',
  404: '请求地址错误或后端接口未部署',
  403: '没有相关权限',
  401: '登录状态过期, 需要重新登录',
  500: '后端服务有未处理的错误',
  502: '后端接口无响应',
  504: '请求超时, 可能是网络问题, 请稍后重试',
};
