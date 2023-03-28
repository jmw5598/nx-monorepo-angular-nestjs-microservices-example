export const environment = {
  production: true,
  api: {
    protocol: 'https',
    subdomain: '',
    domain: 'localhost',
    port: '5000',
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
