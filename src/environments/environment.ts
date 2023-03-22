// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendApiBaseUrl: 'http://localhost:8080',
  firebaseConfig: {
    apiKey: "AIzaSyDQYJXYH4sFGTvy4QeW5gjCKGUpErMSru4",
    authDomain: "acme-explorer-fb57e.firebaseapp.com",
    projectId: "acme-explorer-fb57e",
    storageBucket: "acme-explorer-fb57e.appspot.com",
    messagingSenderId: "904980102277",
    appId: "1:904980102277:web:4c94aaac613e715f233dec",
    measurementId: "G-9HMVSTFF5P"
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
