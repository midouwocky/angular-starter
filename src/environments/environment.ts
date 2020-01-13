// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoints: {
    // loginUrl: 'http://www.mocky.io/v2/5e149ac62d00004b00167231',
    loginUrl: 'http://www.mocky.io/v2/5e172e313000003478d5642e',
    profile: 'http://www.mocky.io/v2/5e1336383100005a8ad4768c',
    realTimeUrl: 'http://192.168.1.37:8080/angage/websocket-display',
    realTimeChannel: '/topic/display-CH4E',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
