import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import {
  ZODIAC_SIGNS,
  getDailyHoroscope,
  type DailyHoroscope,
} from '../constants/horoscopeData';

const { width: SW } = Dimensions.get('window');

// Animated score bar
function ScoreBar({
  score,
  color,
  delay,
}: {
  score: number;
  color: string;
  delay: number;
}) {
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withDelay(
      delay,
      withTiming(score * 10, { duration: 1000, easing: Easing.out(Easing.cubic) })
    );
  }, []);
  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));
  return (
    <View style={s.barTrack}>
      <Animated.View style={[s.barFill, { backgroundColor: color }, barStyle]} />
    </View>
  );
}

// Glassmorphism card
function GlassCard({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: object;
}) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(600).springify().damping(18)}
      style={[s.glassCard, style]}
    >
      {children}
    </Animated.View>
  );
}

const SECTIONS: {
  key: keyof Pick<DailyHoroscope, 'overall' | 'love' | 'career' | 'health' | 'finance'>;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
  { key: 'overall', label: 'Tổng Quan', icon: 'sparkles', color: '#f59e0b' },
  { key: 'love', label: 'Tình Yêu', icon: 'heart', color: '#ec4899' },
  { key: 'career', label: 'Sự Nghiệp', icon: 'briefcase', color: '#8b5cf6' },
  { key: 'health', label: 'Sức Khỏe', icon: 'fitness', color: '#22c55e' },
  { key: 'finance', label: 'Tài Chính', icon: 'wallet', color: '#06b6d4' },
];

export default function HoroscopeResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { sign: signId } = useLocalSearchParams<{ sign: string }>();

  const sign = ZODIAC_SIGNS.find((s) => s.id === signId) ?? ZODIAC_SIGNS[0];
  const today = new Date();
  const horoscope = getDailyHoroscope(sign.id, today);

  const dateStr = today.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Symbol entrance animation
  const symbolScale = useSharedValue(0.3);
  const symbolOpacity = useSharedValue(0);
  useEffect(() => {
    symbolScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    symbolOpacity.value = withTiming(1, { duration: 800 });
  }, []);
  const symbolStyle = useAnimatedStyle(() => ({
    transform: [{ scale: symbolScale.value }],
    opacity: symbolOpacity.value,
  }));

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Tử Vi Hôm Nay</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Hero Section */}
        <Animated.View style={s.heroSection}>
          {/* Glow background */}
          <View style={[s.glowBg, { backgroundColor: `${sign.color}15` }]} />

          <Animated.Text style={[s.heroSymbol, { color: sign.color }, symbolStyle]}>
            {sign.symbol}
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(200).duration(600)}>
            <Text style={s.heroName}>{sign.nameVi}</Text>
            <Text style={s.heroSub}>{sign.name} · {sign.rulingPlanet}</Text>
            <Text style={s.heroDate}>{dateStr}</Text>
          </Animated.View>

          {/* Trait badges */}
          <Animated.View
            entering={FadeInUp.delay(400).duration(500)}
            style={s.heroBadges}
          >
            {sign.traits.map((t) => (
              <View key={t} style={[s.heroBadge, { borderColor: `${sign.color}40` }]}>
                <Text style={[s.heroBadgeText, { color: sign.color }]}>{t}</Text>
              </View>
            ))}
          </Animated.View>
        </Animated.View>

        {/* Lucky Info Card */}
        <GlassCard delay={300}>
          <View style={s.luckyRow}>
            <View style={s.luckyItem}>
              <View style={[s.luckyIcon, { backgroundColor: 'rgba(245,158,11,0.12)' }]}>
                <Ionicons name="star" size={18} color="#f59e0b" />
              </View>
              <Text style={s.luckyLabel}>Số may mắn</Text>
              <Text style={[s.luckyValue, { color: '#f59e0b' }]}>
                {horoscope.luckyNumber}
              </Text>
            </View>
            <View style={s.luckyDivider} />
            <View style={s.luckyItem}>
              <View style={[s.luckyIcon, { backgroundColor: 'rgba(236,72,153,0.12)' }]}>
                <Ionicons name="color-palette" size={18} color="#ec4899" />
              </View>
              <Text style={s.luckyLabel}>Màu may mắn</Text>
              <Text style={[s.luckyValue, { color: '#ec4899' }]}>
                {horoscope.luckyColor}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Section Cards */}
        {SECTIONS.map((sec, i) => {
          const data = horoscope[sec.key];
          return (
            <GlassCard key={sec.key} delay={500 + i * 120}>
              <View style={s.secHeader}>
                <View style={[s.secIcon, { backgroundColor: `${sec.color}15` }]}>
                  <Ionicons name={sec.icon} size={18} color={sec.color} />
                </View>
                <Text style={s.secTitle}>{sec.label}</Text>
                <Text style={[s.secScore, { color: sec.color }]}>
                  {data.score}/10
                </Text>
              </View>
              <ScoreBar score={data.score} color={sec.color} delay={700 + i * 120} />
              <Text style={s.secText}>{data.text}</Text>
            </GlassCard>
          );
        })}

        {/* Advice Card */}
        <GlassCard delay={1200} style={s.adviceCard}>
          <LinearGradient
            colors={[`${sign.color}15`, 'transparent']}
            style={s.adviceGrad}
          >
            <Ionicons name="bulb" size={24} color={sign.color} />
            <Text style={s.adviceLabel}>Lời khuyên hôm nay</Text>
            <Text style={s.adviceText}>{horoscope.advice}</Text>
          </LinearGradient>
        </GlassCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  scroll: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 8,
  },
  glowBg: {
    position: 'absolute',
    top: -20,
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.6,
  },
  heroSymbol: {
    fontSize: 72,
    marginBottom: 8,
  },
  heroName: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
  heroDate: {
    fontSize: 12,
    color: Colors.textDim,
    textAlign: 'center',
    marginTop: 6,
    textTransform: 'capitalize',
  },
  heroBadges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  heroBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Glass Card
  glassCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },

  // Lucky
  luckyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  luckyItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  luckyIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  luckyLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  luckyValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  luckyDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.border,
  },

  // Section
  secHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  secIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  secScore: {
    fontSize: 16,
    fontWeight: '800',
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginBottom: 12,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  secText: {
    fontSize: 13.5,
    color: Colors.textSecondary,
    lineHeight: 21,
  },

  // Advice
  adviceCard: {
    padding: 0,
    overflow: 'hidden',
  },
  adviceGrad: {
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  adviceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adviceText: {
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
