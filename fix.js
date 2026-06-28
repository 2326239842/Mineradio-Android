var d='C:\\Users\\33904\\AppData\\Local\\Temp\\Mineradio-Android';
var fs=require('fs');

// Write clean build.gradle
var bg=[
'apply plugin: "com.android.application"',
'',
'android {',
'    namespace "com.mineradio.android"',
'    compileSdk 34',
'    defaultConfig {',
'        applicationId "com.mineradio.android"',
'        minSdk 24',
'        targetSdk 34',
'        versionCode 1',
'        versionName "1.0.0"',
'    }',
'    signingConfigs {',
'        release {',
'            storeFile file("release.keystore")',
'            storePassword "android"',
'            keyAlias "android"',
'            keyPassword "android"',
'        }',
'    }',
'    buildTypes {',
'        release {',
'            signingConfig signingConfigs.release',
'            minifyEnabled false',
'        }',
'    }',
'    compileOptions {',
'        sourceCompatibility JavaVersion.VERSION_17',
'        targetCompatibility JavaVersion.VERSION_17',
'    }',
'}',
'',
'dependencies {',
'    implementation "androidx.appcompat:appcompat:1.6.1"',
'    implementation "androidx.webkit:webkit:1.9.0"',
'    implementation "com.google.android.material:material:1.11.0"',
'}',
''
].join('\n');
fs.writeFileSync(d+'\\app\\build.gradle', bg, 'utf8');
console.log('build.gradle written');

// Update workflow
var wf=fs.readFileSync(d+'\\.github\\workflows\\build-apk.yml', 'utf8');
wf=wf.replace(
  'chmod +x gradlew\n          ./gradlew assembleRelease',
  'chmod +x gradlew\n          keytool -genkey -v -keystore release.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000 -storepass android -keypass android -dname "CN=Android,OU=Dev,O=Mineradio,L=Unknown,C=US"\n          ./gradlew assembleRelease'
);
fs.writeFileSync(d+'\\.github\\workflows\\build-apk.yml', wf, 'utf8');
console.log('workflow updated');