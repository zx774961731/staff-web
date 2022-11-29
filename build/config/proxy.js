import { getProxyConfig } from '../../settings'

export function createViteProxy(isUseProxy = true, proxyType) {
  if (!isUseProxy) return undefined
  const proxyConfig = getProxyConfig(proxyType)
  const proxy = {
    '/order': {
      target: 'http://47.94.87.185:7001/',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/order/, ''),
    },
    [proxyConfig.prefix]: {
      target: proxyConfig.target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${proxyConfig.prefix}`), ''),
    },
  }
  return proxy
}
