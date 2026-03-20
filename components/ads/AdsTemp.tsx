import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { AD_COLORS } from '../../constants/adConstants';

type Props = {
  style?: any;
  fixedBottom?: boolean;
  bottomOffset?: number;
  showMedia?: boolean;
};

const SHIMMER_DURATION = 1200;

function ShimmerBlock({
  width, height, borderRadius = 6, marginBottom = 0,
}: {
  width: number | `${number}%`; height: number | `${number}%`;
  borderRadius?: number; marginBottom?: number;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, { toValue: 1, duration: SHIMMER_DURATION, easing: Easing.bezier(0.4, 0, 0.6, 1), useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const opacity = anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 0.6, 0.3] });

  return (
    <Animated.View style={{ width, height, borderRadius, marginBottom, backgroundColor: AD_COLORS.AD_SHIMMER, opacity }} />
  );
}

const AdsTemp: React.FC<Props> = ({ style, fixedBottom, bottomOffset = 16, showMedia = true }) => {
  const fixedStyle = fixedBottom ? { ...styles.fixedBottom, bottom: bottomOffset } : null;

  return (
    <View style={[styles.adCard, fixedBottom && fixedStyle, style]}>
      {showMedia && (
        <View style={styles.mediaWrap}>
          <ShimmerBlock width="100%" height="100%" borderRadius={12} />
        </View>
      )}
      <View style={styles.adContent}>
        <ShimmerBlock width="70%" height={14} marginBottom={8} />
        <ShimmerBlock width="90%" height={11} marginBottom={6} />
        <ShimmerBlock width="50%" height={11} marginBottom={14} />
        <ShimmerBlock width="100%" height={50} borderRadius={28} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AD_COLORS.AD_BORDER,
    backgroundColor: AD_COLORS.AD_CARD_BG,
    padding: 12,
    flexDirection: 'column',
  },
  fixedBottom: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    zIndex: 10,
  },
  adContent: { width: '100%' },
  mediaWrap: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
});

export default AdsTemp;
