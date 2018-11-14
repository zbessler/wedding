// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    logglyJsKey: 'TODO',
    analyticsId: 'TODO',
    firebase: {
        apiKey: 'AIzaSyDSvsc-q2ldDgMZWACWtQGL1D6x-9rnHVM',
        authDomain: 'wedding-1bd04.firebaseapp.com',
        databaseURL: 'https://wedding-1bd04.firebaseio.com',
        projectId: 'wedding-1bd04',
        storageBucket: 'wedding-1bd04.appspot.com',
        messagingSenderId: '582991665121'
    }
};
