// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  api: {
    protocol: 'http',
    subdomain: '',
    domain: 'localhost',
    port: '5000',
    apiSlug: 'api/v1',
    authSlug: 'api/v1/auth'
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
