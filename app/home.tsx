import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useReading } from '../context/ReadingContext';
import { Colors } from '../constants/theme';
import { NativeAdComponent } from '../components/ads/NativeAdComponent';
import { ADS_UNIT } from '../components/ads/AdManager';
import BannerAdComponent from '../components/ads/BannerAdComponent';

const { width: SW, height: SH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setMode, clear } = useReading();

  const handleSelectMode = (mode: 'palm' | 'face') => {
    clear();
    setMode(mode);
    router.push('/capture');
  };

  const handleHoroscope = () => {
    router.push('/horoscope');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Bar - fixed */}
      <Animated.View entering={FadeInUp.duration(600)} style={styles.topBar}>
        <View style={styles.brandRow}>
          {/* <View style={styles.brandIcon}>
            <Ionicons name="eye" size={16} color={Colors.purpleLight} />
          </View> */}
          <Text style={styles.brandName}>PALM READER</Text>
        </View>
        <View style={styles.topBarRight}>
          <TouchableOpacity
            style={styles.vipBtn}
            onPress={() => router.push("/buy-vip")}
          >
            <Ionicons name="diamond" size={12} color="#1a0f3d" />
            <Text style={styles.vipText}>PRO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => router.push("/settings")}
          >
            <Ionicons
              name="settings-outline"
              size={20}
              color="rgba(255,255,255,0.5)"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Animated.Text
          entering={FadeInUp.delay(100).duration(600)}
          style={styles.subtitle}
        >
          ✦ Khám phá vận mệnh của bạn ✦
        </Animated.Text>

        {/* Mode Cards */}
        <View style={styles.cardsContainer}>
          {/* 1. Palm Reading Card — Large hero card */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(16)}
          >
            <TouchableOpacity
              style={styles.heroCard}
              activeOpacity={0.88}
              onPress={() => handleSelectMode("palm")}
            >
              <ImageBackground
                source={require("../assets/images/palm_bg.png")}
                style={styles.heroCardInner}
                imageStyle={{ borderRadius: 24 }}
                resizeMode="cover"
              >
                {/* Dark overlay for text readability */}
                <View style={styles.heroImgOverlay} />

                <View style={styles.heroContent}>
                  <View style={styles.heroTextArea}>
                    <Text style={styles.heroTitle}>Xem Chỉ Tay</Text>
                    <Text style={styles.heroDesc}>
                      Quét & phân tích đường chỉ tay, giải mã tính cách, tình
                      duyên & vận mệnh
                    </Text>
                    <View style={styles.heroBadgeRow}>
                      <View
                        style={[
                          styles.heroBadge,
                          {
                            backgroundColor: "rgba(139,92,246,0.12)",
                            borderColor: "rgba(139,92,246,0.25)",
                          },
                        ]}
                      >
                        <Ionicons
                          name="scan"
                          size={10}
                          color={Colors.purpleLight}
                        />
                        <Text
                          style={[
                            styles.heroBadgeText,
                            { color: Colors.purpleLight },
                          ]}
                        >
                          PALM READING
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.heroBadge,
                          {
                            backgroundColor: "rgba(212,175,55,0.12)",
                            borderColor: "rgba(212,175,55,0.25)",
                          },
                        ]}
                      >
                        <Ionicons
                          name="sparkles"
                          size={10}
                          color={Colors.gold}
                        />
                        <Text
                          style={[styles.heroBadgeText, { color: Colors.gold }]}
                        >
                          HOT
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* 
                  <LinearGradient
                    colors={["#7c3aed", "#a855f7"]}
                    style={styles.heroArrow}
                  >
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </LinearGradient> */}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>

          {/* 2. Native Ad */}
          <Animated.View
            entering={FadeInDown.delay(350)
              .duration(600)
              .springify()
              .damping(18)}
            style={styles.adWrapper}
          >
            <NativeAdComponent
              adUnitId={ADS_UNIT.NATIVE_HOME}
              hasMedia={false}
              hasToggleMedia={false}
              style={styles.adCard}
            />
          </Animated.View>

          {/* 3. Face Reading + Horoscope — Two smaller cards side by side */}
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(700)
              .springify()
              .damping(16)}
            style={styles.dualRow}
          >
            {/* Face Reading */}
            <TouchableOpacity
              style={styles.dualCard}
              activeOpacity={0.88}
              onPress={() => handleSelectMode("face")}
            >
              <ImageBackground
                source={require("../assets/images/face_bg.png")}
                style={styles.dualCardInner}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
              >
                {/* Dark overlay */}
                <View style={styles.dualImgOverlay} />

                {/* <View
                  style={[
                    styles.dualIconWrap,
                    {
                      backgroundColor: "rgba(236,72,153,0.12)",
                      borderColor: "rgba(236,72,153,0.3)",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="face-recognition"
                    size={28}
                    color={Colors.pinkLight}
                  />
                </View> */}
                <View style={styles.dualContentWrap}>
                  <Text style={styles.dualTitle}>Xem Tướng Mặt</Text>
                  <Text style={styles.dualDesc}>
                    Nhận diện tướng mạo & tài lộc
                  </Text>
                  <View
                    style={[
                      styles.dualBadge,
                      {
                        backgroundColor: "rgba(236,72,153,0.12)",
                        borderColor: "rgba(236,72,153,0.25)",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dualBadgeText,
                        { color: Colors.pinkLight },
                      ]}
                    >
                      FACE READING
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Horoscope */}
            <TouchableOpacity
              style={styles.dualCard}
              activeOpacity={0.88}
              onPress={handleHoroscope}
            >
              <ImageBackground
                source={require("../assets/images/zodiac_bg.png")}
                style={styles.dualCardInner}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
              >
                {/* Dark overlay */}
                <View style={styles.dualImgOverlay} />

                <View style={styles.dualContentWrap}>
                  <Text style={styles.dualTitle}>Cung Hoàng Đạo</Text>
                  <Text style={styles.dualDesc}>Tử vi hàng ngày 12 cung</Text>
                  <View
                    style={[
                      styles.dualBadge,
                      {
                        backgroundColor: "rgba(6,182,212,0.12)",
                        borderColor: "rgba(6,182,212,0.25)",
                      },
                    ]}
                  >
                    <Text style={[styles.dualBadgeText, { color: "#06b6d4" }]}>
                      ZODIAC
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>

          {/* Mystical quote strip */}
          <Animated.View
            entering={FadeInDown.delay(700).duration(600)}
            style={styles.quoteStrip}
          >
            <Ionicons name="moon" size={16} color={Colors.gold} />
            <Text style={styles.quoteText}>
              "Vận mệnh nằm trong tay bạn — hãy để chúng tôi giải mã"
            </Text>
          </Animated.View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(139,92,246,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.gold,
    letterSpacing: 2.5,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: Colors.gold,
  },
  vipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1a0f3d',
    letterSpacing: 1,
  },
  menuBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textDim,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 4,
    fontWeight: '400',
  },

  // Cards container
  cardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },

  // Hero card (Palm)
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
  },
  heroCardInner: {
    padding: 28,
    overflow: 'hidden',
  },
  heroImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11,5,22,0.0)',
    borderRadius: 24,
  },
  decorCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  heroGhostIcon: {
    position: 'absolute',
    right: 10,
    bottom: -10,
    opacity: 1,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  heroTextArea: {
    marginLeft: 90,
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  heroBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroArrow: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Dual cards row
  dualRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dualCard: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  dualCardInner: {
    padding: 12,
    minHeight: 240,
    flex: 1,
    overflow: 'hidden',
  },
  dualImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(31,10,46,0.0)',
    borderRadius: 20,
  },
  dualContentWrap: {
    marginTop: 130,
   
  },
  dualGhostIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    opacity: 1,
  },
  dualIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 12,
  },
  dualTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 6,
  },
  dualDesc: {
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,

    overflow: 'hidden',
    marginBottom: 10,
  },
  dualBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  dualBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Quote strip
  quoteStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(212,175,55,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.08)',
  },
  quoteText: {
    flex: 1,
    fontSize: 11,
    color: Colors.textDim,
    fontStyle: 'italic',
    lineHeight: 16,
  },

  // Native Ad
  adWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  adCard: {
    width: '100%',
    minHeight: 140,
    borderRadius: 24,
    overflow: 'hidden',
  },
});
