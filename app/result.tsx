import { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
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
import { useReading } from '../context/ReadingContext';
import { Colors } from '../constants/theme';

const { width: SW } = Dimensions.get('window');

const SECTIONS = [
  { key: 'overall', title: 'Tổng Quan', icon: 'sparkles', color: Colors.gold },
  { key: 'love', title: 'Tình Yêu', icon: 'heart', color: '#ec4899' },
  { key: 'career', title: 'Sự Nghiệp', icon: 'briefcase', color: Colors.purple },
  { key: 'health', title: 'Sức Khỏe', icon: 'fitness', color: '#10b981' },
  { key: 'personality', title: 'Tính Cách', icon: 'person', color: '#f59e0b' },
  { key: 'future', title: 'Tương Lai', icon: 'telescope', color: '#3b82f6' },
] as const;

// Glass card with stagger animation
function GlassSection({
  section,
  content,
  index,
}: {
  section: (typeof SECTIONS)[number];
  content: string;
  index: number;
}) {
  const lineWidth = useSharedValue(0);
  useEffect(() => {
    lineWidth.value = withDelay(
      400 + index * 150,
      withTiming(100, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
  }, []);
  const lineStyle = useAnimatedStyle(() => ({
    width: `${lineWidth.value}%`,
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(300 + index * 150)
        .duration(600)
        .springify()
        .damping(18)}
      style={styles.section}
    >
      {/* Accent line */}
      <Animated.View
        style={[styles.accentLine, { backgroundColor: `${section.color}30` }, lineStyle]}
      />

      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIcon, { backgroundColor: `${section.color}15` }]}>
          <Ionicons name={section.icon as any} size={18} color={section.color} />
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <View style={[styles.sectionDot, { backgroundColor: section.color }]} />
      </View>
      <Text style={styles.sectionContent}>{content}</Text>
    </Animated.View>
  );
}

export default function ResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mode, result, imageUri, clear } = useReading();

  const isPalm = mode === 'palm';
  const accentColor = isPalm ? Colors.purple : Colors.pink;

  const handleNewReading = () => {
    clear();
    router.replace('/');
  };

  // Hero symbol animation
  const heroScale = useSharedValue(0.5);
  const heroOpacity = useSharedValue(0);
  useEffect(() => {
    heroScale.value = withSpring(1, { damping: 14, stiffness: 90 });
    heroOpacity.value = withTiming(1, { duration: 700 });
  }, []);
  const heroStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heroScale.value }],
    opacity: heroOpacity.value,
  }));

  if (!result) {
    return (
      <View style={[styles.container, styles.centered, { paddingTop: insets.top }]}>
        <Animated.View style={heroStyle}>
          <Ionicons
            name={isPalm ? 'hand-left' : 'person'}
            size={48}
            color={accentColor}
          />
        </Animated.View>
        <ActivityIndicator size="large" color={accentColor} style={{ marginTop: 20 }} />
        <Text style={styles.loadingText}>Đang giải mã vận mệnh...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kết Quả</Text>
        <View style={{ width: 36 }} />
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Banner */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600).springify().damping(18)}
        >
          <LinearGradient
            colors={
              isPalm
                ? ['#1e1145', '#2d1b69', '#1a0f3d']
                : ['#1a1535', '#25163d', '#150e2d']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            {/* Glow */}
            <View
              style={[
                styles.bannerGlow,
                { backgroundColor: `${accentColor}15` },
              ]}
            />

            <View style={[styles.bannerIcon, { backgroundColor: `${accentColor}15` }]}>
              <Ionicons
                name={isPalm ? 'hand-left' : 'person'}
                size={28}
                color={isPalm ? Colors.purpleLight : Colors.pinkLight}
              />
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>
                {isPalm ? 'Xem Chỉ Tay' : 'Xem Tướng Mặt'}
              </Text>
              <Text style={styles.bannerSubtitle}>Kết quả phân tích AI</Text>
            </View>
            <View style={[styles.bannerBadge, { borderColor: `${accentColor}40` }]}>
              <Ionicons name="checkmark-circle" size={14} color={accentColor} />
              <Text style={[styles.bannerBadgeText, { color: accentColor }]}>
                Hoàn tất
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Captured image */}
        {imageUri && (
          <Animated.View
            entering={FadeInDown.delay(200).duration(600).springify().damping(18)}
            style={styles.palmImageWrap}
          >
            <Image source={{ uri: imageUri }} style={styles.palmImage} />
            <LinearGradient
              colors={['transparent', 'rgba(6,6,14,0.8)']}
              style={styles.imageOverlay}
            />
          </Animated.View>
        )}

        {/* Reading Sections */}
        {SECTIONS.map((section, index) => {
          const content = result[section.key];
          if (!content) return null;
          return (
            <GlassSection
              key={section.key}
              section={section}
              content={content}
              index={index}
            />
          );
        })}

        {/* Disclaimer */}
        <Animated.Text
          entering={FadeInDown.delay(1200).duration(400)}
          style={styles.disclaimer}
        >
          * Kết quả chỉ mang tính chất giải trí, không phải lời khuyên chuyên nghiệp.
        </Animated.Text>

        {/* New Reading Button */}
        <Animated.View
          entering={FadeInDown.delay(1300).duration(500).springify().damping(18)}
        >
          <TouchableOpacity
            style={styles.newReadingBtn}
            activeOpacity={0.85}
            onPress={handleNewReading}
          >
            <LinearGradient
              colors={isPalm ? ['#7c3aed', '#8b5cf6'] : ['#db2777', '#ec4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.newReadingGradient}
            >
              <Ionicons name="refresh" size={20} color="#fff" />
              <Text style={styles.newReadingText}>Xem Lại</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: Colors.textMuted,
  },
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Banner
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 20,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.15)',
    overflow: 'hidden',
  },
  bannerGlow: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  bannerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 3,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  // Section glass card
  section: {
    marginBottom: 14,
    padding: 18,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 2,
    borderRadius: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionContent: {
    fontSize: 13.5,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  disclaimer: {
    fontSize: 11,
    color: Colors.textDim,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  newReadingBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  newReadingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  newReadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  palmImageWrap: {
    marginBottom: 18,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.15)',
  },
  palmImage: {
    width: SW - 40,
    height: SW - 40,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});
