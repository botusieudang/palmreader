import { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const LANGUAGE_KEY = 'palm_reader_language';
const ONBOARDING_KEY = 'palm_reader_onboarded';
const VIP_KEY = 'palm_reader_vip';

export default function SplashIndex() {
  const router = useRouter();

  const iconScale = useSharedValue(0.3);
  const iconOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textY = useSharedValue(20);
  const loadingOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // Animations
    iconScale.value = withSpring(1, { damping: 12, stiffness: 80 });
    iconOpacity.value = withTiming(1, { duration: 600 });
    textOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
    textY.value = withDelay(400, withTiming(0, { duration: 500 }));
    loadingOpacity.value = withDelay(700, withTiming(1, { duration: 400 }));
    progressWidth.value = withDelay(
      800,
      withTiming(100, { duration: 2500, easing: Easing.out(Easing.cubic) })
    );

    // Flow:
    // 1st time: Splash → Language → Onboarding → Home
    // Free user: Splash → Onboarding → Home
    // VIP user: Splash → Home
    const timer = setTimeout(async () => {
      try {
        const [lang, onboarded, vip] = await Promise.all([
          AsyncStorage.getItem(LANGUAGE_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
          AsyncStorage.getItem(VIP_KEY),
        ]);

        if (!lang) {
          // First time ever — show language picker
          router.replace('/language');
        } else if (vip === 'true') {
          // VIP user — skip onboarding, go straight to home
          router.replace('/home');
        } else {
          // Free user — show onboarding (ads) then home
          router.replace('/onboarding');
        }
      } catch {
        router.replace('/language');
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const iconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));
  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
  }));
  const loadStyle = useAnimatedStyle(() => ({ opacity: loadingOpacity.value }));
  const barStyle = useAnimatedStyle(() => ({ width: `${progressWidth.value}%` }));

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <View style={styles.glow} />
        <Animated.View style={[styles.iconWrap, iconStyle]}>
          <LinearGradient colors={['#7c3aed', '#8b5cf6']} style={styles.iconGrad}>
            <Ionicons name="hand-left" size={48} color="#fff" />
          </LinearGradient>
        </Animated.View>
        <Animated.Text style={[styles.appName, textStyle]}>PALM READER</Animated.Text>
        <Animated.Text style={[styles.appSub, textStyle]}>
          Khám phá vận mệnh của bạn
        </Animated.Text>
      </View>

      <Animated.View style={[styles.loadingArea, loadStyle]}>
        <Text style={styles.adText}>Đang tải...</Text>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, barStyle]}>
            <LinearGradient
              colors={['#7c3aed', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139,92,246,0.12)',
  },
  iconWrap: {
    marginBottom: 24,
  },
  iconGrad: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: Colors.gold,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 8,
  },
  appSub: {
    color: Colors.textMuted,
    fontSize: 13,
    letterSpacing: 2,
  },
  loadingArea: {
    width: 240,
    alignItems: 'center',
    marginBottom: 100,
  },
  adText: {
    color: Colors.textDim,
    fontSize: 12,
    marginBottom: 10,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
});
