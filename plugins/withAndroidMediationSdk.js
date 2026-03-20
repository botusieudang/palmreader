const {
  withAppBuildGradle,
  withProjectBuildGradle,
} = require("@expo/config-plugins");

const MEDIATION_DEPENDENCIES = [
  "implementation 'com.google.ads.mediation:vungle:7.7.1.0'",
  "implementation 'com.google.ads.mediation:mintegral:17.0.91.0'",
  "implementation 'com.google.ads.mediation:pangle:7.9.1.1.0'",
  "implementation 'com.unity3d.ads:unity-ads:4.17.0'",
  "implementation 'com.google.ads.mediation:unity:4.16.6.0'",
  "implementation 'com.google.ads.mediation:applovin:13.6.0.0'",
  "implementation 'com.google.ads.mediation:inmobi:11.1.0.1'",
  "implementation 'com.google.ads.mediation:ironsource:9.3.0.1'",
];

const MEDIATION_REPOSITORIES = [
  `        maven { url 'https://android-sdk.is.com/' }`,
  `        maven { url 'https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk_oversea' }`,
  `        maven { url 'https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk' }`,
  `        maven { url 'https://artifact.bytedance.com/repository/pangle' }`,
];

function withMediationDependencies(config) {
  return withAppBuildGradle(config, (config) => {
    let gradle = config.modResults.contents;

    MEDIATION_DEPENDENCIES.forEach((dep) => {
      if (!gradle.includes(dep)) {
        gradle = gradle.replace(
          /dependencies\s*\{/,
          `dependencies {\n    ${dep}`,
        );
      }
    });

    config.modResults.contents = gradle;
    return config;
  });
}

function withMediationRepositories(config) {
  return withProjectBuildGradle(config, (config) => {
    let gradle = config.modResults.contents;

    MEDIATION_REPOSITORIES.forEach((repo) => {
      if (!gradle.includes(repo.trim())) {
        gradle = gradle.replace(
          /allprojects\s*\{[\s\S]*?repositories\s*\{/,
          (match) => `${match}\n${repo}`,
        );
      }
    });

    config.modResults.contents = gradle;
    return config;
  });
}

function withAndroidMediationSdk(config) {
  config = withMediationDependencies(config);
  config = withMediationRepositories(config);
  return config;
}

module.exports = withAndroidMediationSdk;
