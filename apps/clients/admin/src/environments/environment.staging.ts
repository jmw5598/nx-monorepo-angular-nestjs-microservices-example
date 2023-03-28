export const environment = {
  production: true,
  api: {
    protocol: 'https',
    subdomain: '',
    domain: 'vsp-staging-api.up.railway.app',
    port: '',
    apiSlug: 'api/v1',
    authSlug: 'auth'
  },
  recaptcha: {
    siteKey: '6LfGLB0iAAAAACKHwA_U6JQMtD0vYbP_P1PDjIwb'
  },
  liveChatWebSocket: {
    protocol: 'http',
    subdomain: '',
    domain: 'localhost',
    port: '7014',
    websocketSlug: 'sockets',
    hubEndpoint: 'live-chat',
  }
};
