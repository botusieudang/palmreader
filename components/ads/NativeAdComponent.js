import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeAd, NativeAdEventType, NativeAdView, NativeAsset, NativeAssetType, NativeMediaView } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AD_COLORS } from '../../constants/adConstants';
import { ADS_UNIT } from './AdManager';
import AdsTemp from './AdsTemp';

const { width } = Dimensions.get('window');

export const NativeAdComponent = (props) => {
  const [isVip, setIsVip] = useState(false);
  const [nativeAd, setNativeAd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [adClickCount, setAdClickCount] = useState(0);
  const [isMediaVisible, setIsMediaVisible] = useState(true);
  const hasToggle = props.hasToggleMedia !== undefined ? props.hasToggleMedia : false;
  const hasMedia = props.hasMedia !== undefined ? props.hasMedia : true;

  useEffect(() => {
    AsyncStorage.getItem('palm_reader_vip').then((v) => {
      if (v === 'true') setIsVip(true);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (isVip || !nativeAd) return;
    const listener = nativeAd.addAdEventListener(NativeAdEventType.CLICKED, () => {
      setTimeout(() => {
        setNativeAd(null); setIsLoading(true); setLoadTimeout(false);
        setAdClickCount((p) => p + 1);
      }, 1000);
    });
    return () => { listener.remove(); };
  }, [nativeAd]);

  useEffect(() => {
    if (isVip) return;
    const loadAd = async () => {
      try {
        const unitId = props.adUnitId || ADS_UNIT.NATIVE_ONBOARDING;
        const timeout = setTimeout(() => setLoadTimeout(true), props.loadTimeout || 2000);
        const ad = await NativeAd.createForAdRequest(unitId);
        clearTimeout(timeout);
        setNativeAd(ad);
        setIsLoading(false);
        if (props.onAdLoaded) props.onAdLoaded();
      } catch (error) {
        console.error('Native Ad failed:', error);
        setLoadTimeout(true);
        setIsLoading(false);
        if (props.onAdLoaded) props.onAdLoaded();
      }
    };
    setTimeout(loadAd, 1000);
  }, [adClickCount, isVip]);

  if (isVip) return null;

  if (isLoading || !nativeAd || loadTimeout) {
    return <AdsTemp style={props.style} showMedia={!hasToggle && hasMedia} />;
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.labelWrap}>
        {hasToggle && hasMedia && isMediaVisible && (
          <TouchableOpacity style={styles.toggleBtn} onPress={() => setIsMediaVisible(false)}>
            <Text style={styles.toggleText}>▼</Text>
          </TouchableOpacity>
        )}
        <View style={styles.label}>
          <Text style={styles.labelText}>Ad</Text>
        </View>
      </View>

      <NativeAdView nativeAd={nativeAd} style={styles.adView}>
        {isMediaVisible && hasMedia && (
          <View style={styles.mediaWrap}>
            <NativeMediaView style={styles.media} />
          </View>
        )}

        <View style={styles.header}>
          {nativeAd.icon && (
            <NativeAsset assetType={NativeAssetType.ICON} style={styles.iconWrap}>
              <Image source={{ uri: nativeAd.icon.url }} style={styles.icon} resizeMode="cover" />
            </NativeAsset>
          )}
          <View style={styles.headerText}>
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text style={styles.headline} numberOfLines={1}>{nativeAd.headline}</Text>
            </NativeAsset>
            {nativeAd.advertiser && (
              <NativeAsset assetType={NativeAssetType.ADVERTISER}>
                <Text style={styles.advertiser} numberOfLines={1}>{nativeAd.advertiser}</Text>
              </NativeAsset>
            )}
            <View style={styles.infoRow}>
              {nativeAd.starRating > 0 && (
                <NativeAsset assetType={NativeAssetType.STAR_RATING}>
                  <Text style={styles.rating}>⭐ {nativeAd.starRating}/5</Text>
                </NativeAsset>
              )}
              {nativeAd.price && nativeAd.price.trim() !== '' && (
                <NativeAsset assetType={NativeAssetType.PRICE}>
                  <Text style={styles.price}>{nativeAd.price}</Text>
                </NativeAsset>
              )}
            </View>
            {nativeAd.body && (
              <NativeAsset assetType={NativeAssetType.BODY}>
                <Text style={styles.body} numberOfLines={1}>{nativeAd.body}</Text>
              </NativeAsset>
            )}
          </View>
        </View>

        {nativeAd.callToAction && (
          <View style={styles.cta}>
            <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
              <Text style={styles.ctaText}>{nativeAd.callToAction}</Text>
            </NativeAsset>
          </View>
        )}
      </NativeAdView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 260,
    width: '100%', borderRadius: 16, borderWidth: 1,
    borderColor: AD_COLORS.AD_BORDER, backgroundColor: AD_COLORS.AD_CARD_BG,
    padding: 10, position: 'relative',
  },
  adView: { flex: 1, width: '100%' },
  labelWrap: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
    paddingHorizontal: 2, paddingVertical: 2, zIndex: 1,
  },
  label: { backgroundColor: AD_COLORS.AD_SPONSORED_BG, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, opacity: 0.8 },
  labelText: { fontSize: 10, color: AD_COLORS.AD_TEXT, fontWeight: '600' },
  toggleBtn: { backgroundColor: AD_COLORS.AD_ICON_BG, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4, marginRight: 4 },
  toggleText: { fontSize: 10, color: '#fff', textAlign: 'center' },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  iconWrap: { marginRight: 10 },
  icon: { width: 40, height: 40, borderRadius: 20, margin: 2 },
  headerText: { flex: 1, paddingRight: 4 },
  headline: { fontSize: 16, fontWeight: '700', color: AD_COLORS.AD_HEADLINE, lineHeight: 20 },
  advertiser: { fontSize: 12, color: AD_COLORS.AD_ADVERTISER, fontWeight: '500' },
  rating: { fontSize: 12, color: AD_COLORS.AD_RATING, fontWeight: '600' },
  price: { paddingLeft: 10, fontSize: 12, fontWeight: 'bold', color: AD_COLORS.AD_PRICE },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  mediaWrap: { justifyContent: 'center', alignItems: 'center', marginBottom: 5, overflow: 'hidden', width: '100%', height: 120, backgroundColor: 'transparent' },
  media: { width: '100%', height: '100%', borderRadius: 12 },
  body: { fontSize: 12, color: AD_COLORS.AD_BODY, lineHeight: 16, marginBottom: 1 },
  cta: { backgroundColor: AD_COLORS.AD_CTA_BG, paddingVertical: 3, paddingHorizontal: 3, borderRadius: 28, alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 1 },
  ctaText: { color: AD_COLORS.AD_CTA_TEXT, fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.3, width: '100%', paddingVertical: 10, textAlign: 'center' },
});
