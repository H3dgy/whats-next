// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:4000',
  imagesBaseUrl: 'http://image.tmdb.org/t/p',
  backdropSizes: ['w300', 'w780', 'w1280', 'original'],
  logoSizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  posterSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profileSizes: ['w45', 'w185', 'h632', 'original'],
  stillSizes: ['w92', 'w185', 'w300', 'original']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
