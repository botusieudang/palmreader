import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated as RNAnimated,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';
import { NativeAdComponent } from '../components/ads/NativeAdComponent';
import { ADS_UNIT } from '../components/ads/AdManager';

const { width: SW, height: SH } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    icon: 'hand-back-left' as const,
    iconColor: '#8b5cf6',
    title: 'Xem Chỉ Tay AI',
    subtitle: 'Chụp ảnh lòng bàn tay, AI sẽ phân tích đường chỉ tay và giải mã vận mệnh của bạn.',
    gradColors: ['#1e1145', '#2d1b69'] as [string, string],
  },
  {
    id: '2',
    icon: 'face-recognition' as const,
    iconColor: '#ec4899',
    title: 'Xem Tướng Mặt',
    subtitle: 'Nhận diện đặc điểm khuôn mặt, khám phá tài lộc, nhân duyên và tính cách ẩn sâu.',
    gradColors: ['#1a1535', '#25163d'] as [string, string],
  },
  {
    id: '3',
    icon: 'zodiac-leo' as const,
    iconColor: '#06b6d4',
    title: 'Cung Hoàng Đạo',
    subtitle: 'Tử vi hàng ngày theo 12 cung hoàng đạo. Tình yêu, sự nghiệp, sức khỏe và tài chính.',
    gradColors: ['#0f2027', '#203a43'] as [string, string],
  },
];

function Dot({ i, progress }: { i: number; progress: SharedValue<number> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [i - 1, i, i + 1], [8, 24, 8]);
    const backgroundColor = interpolateColor(
      progress.value,
      [i - 1, i, i + 1],
      ['rgba(255,255,255,0.15)', '#8b5cf6', 'rgba(255,255,255,0.15)'],
    );
    return { width, backgroundColor };
  });
  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const bottomFade = useRef(new RNAnimated.Value(0)).current;
  const buttonFade = useRef(new RNAnimated.Value(0)).current;

  const isLastSlide = activeIndex === SLIDES.length - 1;

  useEffect(() => {
    RNAnimated.timing(bottomFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  // Fallback: show button after 3s if ad doesn't load on last slide
  useEffect(() => {
    if (isLastSlide) {
      const fallbackTimer = setTimeout(() => {
        RNAnimated.timing(buttonFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 3000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [activeIndex]);

  const handleNext = () => {
    bottomFade.setValue(0);
    if (!isLastSlide) {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
    } else {
      AsyncStorage.setItem('palm_reader_onboarded', 'true').catch(() => {});
      router.replace('/home');
    }
  };

  const handleBack = () => {
    bottomFade.setValue(0);
    if (activeIndex > 0) {
      carouselRef.current?.scrollTo({ index: activeIndex - 1, animated: true });
    }
  };

  const renderItem = ({ item }: { item: (typeof SLIDES)[0] }) => (
    <View style={styles.slide}>
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <LinearGradient colors={item.gradColors} style={styles.slideIcon}>
          <MaterialCommunityIcons name={item.icon} size={56} color={item.iconColor} />
        </LinearGradient>
      </Animated.View>
      <Animated.View entering={FadeInDown.duration(400).delay(200)} style={styles.slideText}>
        <Text style={[styles.slideTitle, { color: item.iconColor }]}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </Animated.View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Carousel */}
      <View style={{ flex: 1 }}>
        <Carousel
          ref={carouselRef}
          loop={false}
          width={SW}
          height={SH * 0.55}
          data={SLIDES}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => setActiveIndex(index)}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress;
          }}
          renderItem={renderItem}
        />
      </View>

      {/* Bottom section */}
      <RNAnimated.View style={{ justifyContent: 'center', opacity: bottomFade }}>
        {!isLastSlide ? (
          <>
            {/* Slide 1 & 2: back+dots → ad → button */}
            <View style={styles.bottomRow}>
              {activeIndex > 0 ? (
                <TouchableOpacity onPress={handleBack}>
                  <Ionicons name="arrow-back-circle-outline" size={36} color={Colors.textMuted} />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 36 }} />
              )}
              <View style={styles.pagination}>
                {SLIDES.map((_, index) => (
                  <Dot key={index} i={index} progress={progress} />
                ))}
              </View>
              <View style={{ width: 36 }} />
            </View>

            <View style={styles.adsSection}>
              <NativeAdComponent
                adUnitId={ADS_UNIT.NATIVE_ONBOARDING}
                hasMedia={true}
                hasToggleMedia={false}
              />
            </View>

            <View style={styles.btnSection}>
              <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#7c3aed', '#8b5cf6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.nextBtn}
                >
                  <Text style={styles.nextText}>Tiếp Tục</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Slide 3: back+dots → button → ad (at bottom) */}
            <View style={styles.bottomRow}>
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back-circle-outline" size={36} color={Colors.textMuted} />
              </TouchableOpacity>
              <View style={styles.pagination}>
                {SLIDES.map((_, index) => (
                  <Dot key={index} i={index} progress={progress} />
                ))}
              </View>
              <View style={{ width: 36 }} />
            </View>

            <RNAnimated.View style={[styles.btnSection, { opacity: buttonFade }]}>
              <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#7c3aed', '#8b5cf6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.nextBtn}
                >
                  <Text style={styles.nextText}>Bắt Đầu</Text>
                </LinearGradient>
              </TouchableOpacity>
            </RNAnimated.View>

            <View style={styles.adsSection}>
              <NativeAdComponent
                adUnitId={ADS_UNIT.NATIVE_ONBOARDING}
                hasMedia={true}
                hasToggleMedia={false}
                onAdLoaded={() => {
                  RNAnimated.timing(buttonFade, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                  }).start();
                }}
              />
            </View>
          </>
        )}
      </RNAnimated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  slide: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideIcon: {
    width: SW * 0.38,
    height: SW * 0.38,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  slideText: {
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  slideSubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },

  // Bottom row (back + dots)
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // Ad section
  adsSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  // Button
  btnSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  nextBtn: {
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
