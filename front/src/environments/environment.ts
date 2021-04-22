// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3001/',
  firebase: {
    apiKey: "AIzaSyBB_2sy2QHc0S8CcBqAwo2pyY9jlg0wkg8",
    authDomain: "recherchetoncoequipier.firebaseapp.com",
    projectId: "recherchetoncoequipier",
    storageBucket: "recherchetoncoequipier.appspot.com",
    messagingSenderId: "814625685803",
    appId: "1:814625685803:web:b25e1d9f325e096c2b056e"
  },
  io: 'http://localhost:3000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
