import * as NavigationBar from "expo-navigation-bar";
import { Platform, StatusBar } from "react-native";
import mobileAds, { TestIds } from "react-native-google-mobile-ads";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IS_PRODUCTION } from "../../constants/adConstants";

const hideSystemBars = () => {
  StatusBar.setHidden(true);
  if (Platform.OS === "android") {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }
};

export const ADS_UNIT_VALUES = {
  DEV: {
    AOA_SPLASH_SCREEN: TestIds.APP_OPEN,
    NATIVE_LANGUAGE: TestIds.NATIVE,
    NATIVE_ONBOARDING: TestIds.NATIVE,
    NATIVE_HOME: TestIds.NATIVE,
    BANNER_HOME: TestIds.BANNER,
    INTER_CAPTURE: TestIds.INTERSTITIAL,
    INTER_PREMIUM_CLOSE: TestIds.INTERSTITIAL,
    NATIVE_RESULT: TestIds.NATIVE,
  },
  PROD: {
    AOA_SPLASH_SCREEN: "ca-app-pub-3940256099942544/9257395921",
    NATIVE_LANGUAGE: "ca-app-pub-3940256099942544/2247696110",
    NATIVE_ONBOARDING: "ca-app-pub-3940256099942544/2247696110",
    NATIVE_HOME: "ca-app-pub-3940256099942544/2247696110",
    BANNER_HOME: "ca-app-pub-3940256099942544/9214589741",
    INTER_CAPTURE: "ca-app-pub-3940256099942544/1033173712",
    INTER_PREMIUM_CLOSE: "ca-app-pub-3940256099942544/1033173712",
    NATIVE_RESULT: "ca-app-pub-3940256099942544/2247696110",
  },
};

export const ADS_UNIT = IS_PRODUCTION ? ADS_UNIT_VALUES.PROD : ADS_UNIT_VALUES.DEV;

class AdManager {
  constructor() {
    this.isInitialized = false;
    this.isModuleLoaded = false;
    this.InterstitialAd = null;
    this.AppOpenAd = null;
    this.AdEventType = null;
    this.isFullscreenAdShowing = false;
    this.lastAppOpenAdTime = 0;
    this.APP_OPEN_AD_COOLDOWN = 30000;
    this.isAppOpenAdLoading = false;
    this.interstitialAds = [
      { id: "INTER_CAPTURE", adUnitId: ADS_UNIT.INTER_CAPTURE, cooldown: 10000, lastShown: 0, lastPreload: 0, preloaded: null, loading: false },
      { id: "INTER_PREMIUM_CLOSE", adUnitId: ADS_UNIT.INTER_PREMIUM_CLOSE, cooldown: 10000, lastShown: 0, lastPreload: 0, preloaded: null, loading: false },
    ];
    this.preloadedAds = { appOpen: null };
    this.adLoadingStates = { appOpen: false };
    this.loadGoogleMobileAds();
  }

  async isVip() {
    try {
      return (await AsyncStorage.getItem("palm_reader_vip")) === "true";
    } catch { return false; }
  }

  loadGoogleMobileAds() {
    try {
      const mod = require("react-native-google-mobile-ads");
      this.InterstitialAd = mod.InterstitialAd;
      this.AppOpenAd = mod.AppOpenAd;
      this.AdEventType = mod.AdEventType;
      this.isModuleLoaded = !!(this.InterstitialAd && this.AdEventType);
    } catch (e) {
      console.log("⚠️ Google Mobile Ads not available:", e.message);
      this.isModuleLoaded = false;
      this.isInitialized = true;
    }
  }

  async initialize() {
    if (!this.isModuleLoaded) { this.isInitialized = true; return true; }
    try { mobileAds().initialize(); } catch {}
    this.isInitialized = true;
    this.preloadAllAds();
    return true;
  }

  setFullscreenAdShowing(v) { this.isFullscreenAdShowing = !!v; }
  isAnyFullscreenShowing() { return !!this.isFullscreenAdShowing; }
  isAdsInitialized() { return this.isInitialized; }
  isGoogleMobileAdsAvailable() { return this.isModuleLoaded; }

  async preloadAllAds() {
    if (await this.isVip()) return;
    this.interstitialAds.forEach((ad) => this.preloadInterstitialAd(ad.adUnitId));
    this.preloadAppOpenAd();
  }

  getInterstitialAdConfig(adId) {
    return this.interstitialAds.find((ad) => ad.adUnitId === adId);
  }

  preloadInterstitialAd(adId) {
    const cfg = this.getInterstitialAdConfig(adId);
    if (!cfg || !this.isModuleLoaded || cfg.loading || cfg.preloaded) return;
    if (Date.now() - cfg.lastPreload < 30000) return;
    cfg.lastPreload = Date.now();
    cfg.loading = true;
    try {
      const ad = this.InterstitialAd.createForAdRequest(cfg.adUnitId);
      const u1 = ad.addAdEventListener(this.AdEventType.LOADED, () => { cfg.preloaded = ad; cfg.loading = false; u1(); u2(); });
      const u2 = ad.addAdEventListener(this.AdEventType.ERROR, () => { cfg.loading = false; u1(); u2(); setTimeout(() => this.preloadInterstitialAd(adId), 30000); });
      ad.load();
    } catch { cfg.loading = false; }
  }

  async showInterstitialAd(adId, onClosed, onError) {
    if (await this.isVip()) { if (onClosed) onClosed(); return true; }
    const cfg = this.getInterstitialAdConfig(adId);
    if (!cfg) { if (onError) onError("Unknown ad"); return false; }
    if (cfg.cooldown > 0 && Date.now() - cfg.lastShown < cfg.cooldown) { if (onClosed) onClosed(); return true; }
    cfg.lastShown = Date.now();
    if (!this.isModuleLoaded) { if (onClosed) onClosed(); return true; }
    if (cfg.preloaded) {
      const ad = cfg.preloaded; cfg.preloaded = null;
      return new Promise((resolve) => {
        const c = ad.addAdEventListener(this.AdEventType.CLOSED, () => { this.setFullscreenAdShowing(false); hideSystemBars(); c(); e(); if (onClosed) onClosed(); setTimeout(() => this.preloadInterstitialAd(adId), 30000); resolve(true); });
        const e = ad.addAdEventListener(this.AdEventType.ERROR, (err) => { this.setFullscreenAdShowing(false); c(); e(); if (onError) onError(err); resolve(false); });
        this.setFullscreenAdShowing(true); ad.show();
      });
    }
    try {
      const ad = this.InterstitialAd.createForAdRequest(cfg.adUnitId);
      return new Promise((resolve) => {
        const l = ad.addAdEventListener(this.AdEventType.LOADED, () => { this.setFullscreenAdShowing(true); ad.show(); });
        const c = ad.addAdEventListener(this.AdEventType.CLOSED, () => { this.setFullscreenAdShowing(false); hideSystemBars(); l(); c(); e(); if (onClosed) onClosed(); resolve(true); });
        const e = ad.addAdEventListener(this.AdEventType.ERROR, (err) => { this.setFullscreenAdShowing(false); l(); c(); e(); if (onError) onError(err); resolve(false); });
        ad.load();
      });
    } catch { if (onError) onError("Error"); return false; }
  }

  preloadAppOpenAd() {
    if (!this.isModuleLoaded || this.adLoadingStates.appOpen || this.preloadedAds.appOpen) return;
    this.adLoadingStates.appOpen = true;
    try {
      const ad = this.AppOpenAd.createForAdRequest(ADS_UNIT.AOA_SPLASH_SCREEN);
      const u1 = ad.addAdEventListener(this.AdEventType.LOADED, () => { this.preloadedAds.appOpen = ad; this.adLoadingStates.appOpen = false; u1(); u2(); });
      const u2 = ad.addAdEventListener(this.AdEventType.ERROR, () => { this.adLoadingStates.appOpen = false; u1(); u2(); setTimeout(() => this.preloadAppOpenAd(), 60000); });
      ad.load();
    } catch { this.adLoadingStates.appOpen = false; }
  }

  async showAppOpenAd() {
    if (await this.isVip()) return false;
    if (this.isAnyFullscreenShowing()) return false;
    if (Date.now() - this.lastAppOpenAdTime < this.APP_OPEN_AD_COOLDOWN) return false;
    if (!this.isModuleLoaded || this.isAppOpenAdLoading) return false;
    if (this.preloadedAds.appOpen) {
      const ad = this.preloadedAds.appOpen; this.preloadedAds.appOpen = null;
      this.lastAppOpenAdTime = Date.now();
      return new Promise((resolve) => {
        const c = ad.addAdEventListener(this.AdEventType.CLOSED, () => { hideSystemBars(); c(); e(); setTimeout(() => this.preloadAppOpenAd(), 5000); resolve(true); });
        const e = ad.addAdEventListener(this.AdEventType.ERROR, () => { c(); e(); setTimeout(() => this.preloadAppOpenAd(), 5000); resolve(false); });
        try { ad.show(); } catch { c(); e(); resolve(false); }
      });
    }
    return false;
  }
}

export default new AdManager();
