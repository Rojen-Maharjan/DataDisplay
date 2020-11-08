## Data Display

#### Requirements
- npm/yarn

setup environment for development
- install required packages for [ionic cli development](https://ionicframework.com/docs/intro/cli)

### RUN
```bash
git clone <repo-link>
`npm install`
`ionic resources`
`ionic cordova platform add android`
```

### Development
Running application 
- run `ionic cordova run android` for running application on dev env
- run `ionic cordova run android -l` for live reload development on dev env

### BUild
- update gulpfile.js with (EDIT HERE :) for sdk path and build tool version
- run `gulp dev-android` with your build config to output required apk build
