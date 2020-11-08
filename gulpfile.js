const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const { cordova } = require('cordova-lib');
const { execSync } = require('child_process');

// prepare for dev development of android
gulp.task('dev-android', async function () {
  console.log('Started dev build....');

  await addRemovePlatform('android');
  return setTimeout(async function () {
    try {
      await build('android', 'dev', true);
      await sign('dev');
      await align('dev');
      return;
    } catch (e) {
      console.log('Error: ', e);
    }
  }, 5000);
});

// If platform exists first removes it and adds it again with the respective config file
async function addRemovePlatform(platform) {
  console.log(`Check if ${platform} platform already exists.....`);
  const platformPath = path.join(__dirname, 'platforms', platform);
  const exists = fs.existsSync(platformPath);
  if (exists) {
    console.log(
      `${platform} platform already exists, remove ${platform} platfrom....`
    );
    await cordova.platform('remove', platform);
    console.log(`${platform} platform successfully removed....`);
  }

  console.log(`Add ${platform} platform with the new config.xml...`);
  await cordova.platform('add', platform);
  console.log(
    `Add ${platform} platform with the new config.xml successfully added....`
  );
}

// Builds
async function build(platform, env, isRelease = true) {
  console.log(`Start build for ${platform}......`);
  if (isRelease) {
    execSync(
      `ionic cordova build ${platform} --prod --release --verbose`,
      { stdio: 'inherit' }
    );
  } else {
    execSync(
      `ionic cordova build ${platform}  --prod --release --verbose`
    );
  }

  console.log(`Sucessfully finished build for ${platform} :)`);
}

// apk signing for android
async function sign(env) {
  console.log('Start apk signing....');
  if (env != 'uat') {
    execSync(
      'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore thesisreleasekey.keystore  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk -storepass hhh0.19tx thesis',
      { stdio: 'inherit' }
    );
  } else {
    execSync(
      'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore thesisreleasekey.keystore  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk -storepass hhh0.19tx thesis',
      { stdio: 'inherit' }
    );
  }

  console.log('Finsihed signing apk....');
}

// zip-align for android
async function align(env) {
  //EDIT HERE : SDK PATH
  let $ANDROID_HOME = 'C:/Users/bijma/AppData/Local/Android/Sdk';
  console.log('Finding build-tool version...');
  const buildToolVersionString = execSync('ls ' + $ANDROID_HOME + '/build-tools/', {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  }).toString();

  if (!buildToolVersionString) {
    console.error("Could not find android sdk :'(");
  }
  // EDIT HERE : buildToolVersion
  const buildToolVersionToUse = '30.0.0';
  
  console.log(`Using android sdk version ${buildToolVersionToUse}...`);
  const androidHomePath = execSync('echo ' + $ANDROID_HOME, {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  })
    .toString()
    .split('\n')[0];
  console.log(`Check if datadisplay-${env}.apk already exists...`);

  const exists = fs.existsSync(`./datadisplay-${env}.apk`);

  if (exists) {
    console.log(`datadisplay-${env}.apk already exists, delete it`);
    await fs.unlinkSync(`datadisplay-${env}.apk`);
    console.log(`Finished deleting datadisplay-${env}.apk`);
  }
  console.log('Start zip align...');
  execSync(
    `${androidHomePath}/build-tools/${buildToolVersionToUse}/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk datadisplay-${env}.apk`,
    { stdio: 'inherit' }
  );

  console.log('Finished zipalign...');
}
