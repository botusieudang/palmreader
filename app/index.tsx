import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useReading } from '../context/ReadingContext';
import { Colors, Spacing } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setMode, clear } = useReading();

  const handleSelectMode = (mode: 'palm' | 'face') => {
    clear();
    setMode(mode);
    router.push('/capture');
  };

  const handleNumerology = () => {
    router.push('/numerology');
  };

  const handleHoroscope = () => {
    router.push('/horoscope');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <Animated.View entering={FadeInUp.duration(600)} style={styles.topBar}>
          <Text style={styles.brandName}>MYSTIC</Text>
          <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.vipBtn}>
              <Ionicons name="shield-checkmark" size={14} color="#1a0f3d" />
              <Text style={styles.vipText}>VIP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBtn}>
              <Ionicons name="menu" size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text entering={FadeInUp.delay(100).duration(600)} style={styles.subtitle}>
          Khám phá vận mệnh của bạn
        </Animated.Text>

        {/* Mode Cards */}
        <View style={styles.cardsContainer}>
          {/* Palm Reading Card */}
          <Animated.View entering={FadeInDown.delay(200).duration(600).springify().damping(18)}>
          <TouchableOpacity
            style={styles.modeCard}
            activeOpacity={0.85}
            onPress={() => handleSelectMode('palm')}
          >
            <LinearGradient
              colors={['#1e1145', '#2d1b69', '#1a0f3d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={[styles.cardIconArea, { backgroundColor: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.25)' }]}>
                <MaterialCommunityIcons name="hand-back-left" size={32} color={Colors.purpleLight} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Xem Chỉ Tay</Text>
                <Text style={styles.cardDesc}>Phân tích đường vân tay, giải mã tính cách & vận mệnh</Text>
                <View style={[styles.cardBadge, { backgroundColor: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.25)' }]}>
                  <Ionicons name="star" size={10} color={Colors.purpleLight} />
                  <Text style={[styles.badgeText, { color: Colors.purpleLight }]}>AI PALM SCAN</Text>
                </View>
              </View>
              <LinearGradient
                colors={['#7c3aed', '#8b5cf6']}
                style={styles.cardCta}
              >
                <Ionicons name="chevron-forward" size={18} color="#fff" />
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          </Animated.View>

          {/* Face Reading Card */}
          <Animated.View entering={FadeInDown.delay(350).duration(600).springify().damping(18)}>
          <TouchableOpacity
            style={styles.modeCard}
            activeOpacity={0.85}
            onPress={() => handleSelectMode('face')}
          >
            <LinearGradient
              colors={['#1a1535', '#25163d', '#150e2d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={[styles.cardIconArea, { backgroundColor: 'rgba(236,72,153,0.12)', borderColor: 'rgba(236,72,153,0.25)' }]}>
                <MaterialCommunityIcons name="face-recognition" size={32} color={Colors.pinkLight} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Xem Tướng Mặt</Text>
                <Text style={styles.cardDesc}>Nhận diện tướng mạo, khám phá tài lộc & nhân duyên</Text>
                <View style={[styles.cardBadge, { backgroundColor: 'rgba(236,72,153,0.12)', borderColor: 'rgba(236,72,153,0.25)' }]}>
                  <Ionicons name="star" size={10} color={Colors.pinkLight} />
                  <Text style={[styles.badgeText, { color: Colors.pinkLight }]}>AI FACE SCAN</Text>
                </View>
              </View>
              <LinearGradient
                colors={['#db2777', '#ec4899']}
                style={styles.cardCta}
              >
                <Ionicons name="chevron-forward" size={18} color="#fff" />
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          </Animated.View>

          {/* Numerology Card */}
          <Animated.View entering={FadeInDown.delay(500).duration(600).springify().damping(18)}>
          <TouchableOpacity
            style={styles.modeCard}
            activeOpacity={0.85}
            onPress={handleNumerology}
          >
            <LinearGradient
              colors={['#0f2027', '#203a43', '#2c5364']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={[styles.cardIconArea, { backgroundColor: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.25)' }]}>
                <MaterialCommunityIcons name="numeric" size={32} color="#06b6d4" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Thần Số Học</Text>
                <Text style={styles.cardDesc}>Giải mã cuộc đời qua con số ngày sinh và tên của bạn</Text>
                <View style={[styles.cardBadge, { backgroundColor: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.25)' }]}>
                  <Ionicons name="star" size={10} color="#06b6d4" />
                  <Text style={[styles.badgeText, { color: '#06b6d4' }]}>NUMEROLOGY</Text>
                </View>
              </View>
              <LinearGradient
                colors={['#0891b2', '#06b6d4']}
                style={styles.cardCta}
              >
                <Ionicons name="chevron-forward" size={18} color="#fff" />
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          </Animated.View>

          {/* Horoscope Card */}
          <Animated.View entering={FadeInDown.delay(650).duration(600).springify().damping(18)}>
          <TouchableOpacity
            style={[styles.modeCard, { borderColor: 'rgba(245,158,11,0.2)' }]}
            activeOpacity={0.85}
            onPress={handleHoroscope}
          >
            <LinearGradient
              colors={['#1a1408', '#2d2010', '#1f1505']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={[styles.cardIconArea, { backgroundColor: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.25)' }]}>
                <MaterialCommunityIcons name="zodiac-leo" size={32} color="#f59e0b" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>Cung Hoàng Đạo</Text>
                <Text style={styles.cardDesc}>Tử vi hôm nay theo 12 cung hoàng đạo phương Tây</Text>
                <View style={[styles.cardBadge, { backgroundColor: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.25)' }]}>
                  <Ionicons name="star" size={10} color="#f59e0b" />
                  <Text style={[styles.badgeText, { color: '#f59e0b' }]}>HOROSCOPE</Text>
                </View>
              </View>
              <LinearGradient
                colors={['#d97706', '#f59e0b']}
                style={styles.cardCta}
              >
                <Ionicons name="chevron-forward" size={18} color="#fff" />
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
          </Animated.View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  brandName: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '900',
    color: Colors.gold,
    letterSpacing: 3,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: Colors.gold,
  },
  vipText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1a0f3d',
    letterSpacing: 1,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '300',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  modeCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    gap: 16,
  },
  cardIconArea: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12.5,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  cardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardCta: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(212,175,55,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.12)',
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(212,175,55,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gold,
    marginBottom: 2,
  },
  insightDesc: {
    fontSize: 11,
    color: Colors.textDim,
    lineHeight: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 24,
  },
  featItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  powered: {
    fontSize: 10,
    color: Colors.textDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 44,
  },
  poweredHighlight: {
    color: Colors.purple,
    fontWeight: '600',
  },
});
