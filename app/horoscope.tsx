import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  FadeInDown,
} from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import { ZODIAC_SIGNS, ELEMENT_COLORS, getSignFromDate } from '../constants/horoscopeData';
import BannerAdComponent from '../components/ads/BannerAdComponent';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_W - 40 - 24) / 3; // 3 per row: screenW - (paddingH 20*2) - (2 gaps * 12)

type Tab = 'pick' | 'birthday';

export default function HoroscopeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('pick');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');

  const handleSelectSign = (signId: string) => {
    setSelectedSign(signId);
  };

  const handleContinue = () => {
    if (selectedSign) {
      router.push(`/horoscope-result?sign=${selectedSign}`);
    }
  };

  const handleBirthdayLookup = () => {
    const day = parseInt(birthDay, 10);
    const month = parseInt(birthMonth, 10);
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      const sign = getSignFromDate(month, day);
      setSelectedSign(sign.id);
      setTab('pick');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cung Hoàng Đạo</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabRow}>
        <TouchableOpacity

          style={[styles.tab, tab === 'pick' && styles.tabActive]}
          onPress={() => setTab('pick')}
        >
          <Ionicons
            name="grid-outline"
            size={16}
            color={tab === 'pick' ? '#06b6d4' : Colors.textMuted}
          />
          <Text style={[styles.tabText, tab === 'pick' && styles.tabTextActive]}>
            Chọn cung
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'birthday' && styles.tabActive]}
          onPress={() => setTab('birthday')}
        >
          <Ionicons
            name="calendar-outline"
            size={16}
            color={tab === 'birthday' ? '#06b6d4' : Colors.textMuted}
          />
          <Text style={[styles.tabText, tab === 'birthday' && styles.tabTextActive]}>
            Theo ngày sinh
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {tab === 'pick' ? (
          <>
            {/* Zodiac Grid */}
            <View style={styles.grid}>
              {ZODIAC_SIGNS.map((sign, i) => {
                const isSelected = selectedSign === sign.id;
                const elemColor = ELEMENT_COLORS[sign.element];
                return (
                  <Animated.View
                    key={sign.id}
                    entering={FadeInDown.delay(i * 50).duration(400)}
                  >
                    <TouchableOpacity
                      style={[
                        styles.signCard,
                        {
                          backgroundColor: isSelected
                            ? `${sign.color}20`
                            : 'rgba(255,255,255,0.04)',
                          borderColor: isSelected ? sign.color : 'rgba(255,255,255,0.08)',
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => handleSelectSign(sign.id)}
                    >
                      <Text style={[styles.signSymbol, { color: sign.color }]}>
                        {sign.symbol}
                      </Text>
                      <Text style={styles.signName}>{sign.nameVi}</Text>
                      <Text style={styles.signDate}>{sign.dateRange}</Text>
                      {isSelected && (
                        <View style={[styles.checkMark, { backgroundColor: sign.color }]}>
                          <Ionicons name="checkmark" size={12} color="#fff" />
                        </View>
                      )}
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>

            {/* Selected sign detail */}
            {selectedSign && (
              <Animated.View entering={FadeInDown.duration(400)} style={styles.selectedDetail}>
                {(() => {
                  const sign = ZODIAC_SIGNS.find((s) => s.id === selectedSign)!;
                  return (
                    <>
                      <View style={styles.detailHeader}>
                        <Text style={[styles.detailSymbol, { color: sign.color }]}>
                          {sign.symbol}
                        </Text>
                        <View>
                          <Text style={styles.detailName}>{sign.nameVi}</Text>
                          <Text style={styles.detailSub}>
                            {sign.name} · {sign.rulingPlanet}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.traitRow}>
                        {sign.traits.map((t) => (
                          <View
                            key={t}
                            style={[styles.traitBadge, { borderColor: `${sign.color}40` }]}
                          >
                            <Text style={[styles.traitText, { color: sign.color }]}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  );
                })()}
              </Animated.View>
            )}
          </>
        ) : (
          /* Birthday Input */
          <>
          <Animated.View entering={FadeInDown.duration(400)} style={styles.birthdayCard}>
            <Text style={styles.birthdayTitle}>Nhập ngày sinh của bạn</Text>
            <Text style={styles.birthdayDesc}>
              Chúng tôi sẽ xác định cung hoàng đạo dựa trên ngày và tháng sinh
            </Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Ngày</Text>
                <TextInput
                  style={styles.input}
                  value={birthDay}
                  onChangeText={setBirthDay}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="DD"
                  placeholderTextColor={Colors.textDim}
                />
              </View>
              <Text style={styles.inputSep}>/</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tháng</Text>
                <TextInput
                  style={styles.input}
                  value={birthMonth}
                  onChangeText={setBirthMonth}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="MM"
                  placeholderTextColor={Colors.textDim}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.lookupBtn,
                (!birthDay || !birthMonth) && { opacity: 0.4 },
              ]}
              disabled={!birthDay || !birthMonth}
              onPress={handleBirthdayLookup}
            >
              <LinearGradient
                colors={['#06b6d4', '#0891b2']}
                style={styles.lookupGrad}
              >
                <Ionicons name="search" size={18} color="#fff" />
                <Text style={styles.lookupText}>Tra cung hoàng đạo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          </>
        )}
      </ScrollView>

      {/* Bottom: CTA + Banner Ad */}
      <View style={styles.bottomFixed}>
        {selectedSign && tab === 'pick' && (
          <View style={styles.bottomBar}>
            <TouchableOpacity activeOpacity={0.85} onPress={handleContinue}>
              <LinearGradient
                colors={['#06b6d4', '#0891b2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaBtn}
              >
                <Ionicons name="sparkles" size={20} color="#fff" />
                <Text style={styles.ctaText}>Xem Tử Vi Hôm Nay</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        <BannerAdComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#06b6d41f",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: "#06b6d4",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
  },
  signCard: {
    width: CARD_SIZE,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 18,
    alignItems: "center",
    borderWidth: 1.5,
  },
  signSymbol: {
    fontSize: 32,
    marginBottom: 6,
  },
  signName: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  signDate: {
    fontSize: 9,
    color: Colors.textDim,
  },
  checkMark: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDetail: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  detailSymbol: {
    fontSize: 40,
  },
  detailName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  detailSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  traitRow: {
    flexDirection: "row",
    gap: 8,
  },
  traitBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  traitText: {
    fontSize: 12,
    fontWeight: "600",
  },
  birthdayCard: {
    marginTop: 20,
    padding: 24,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  birthdayTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  birthdayDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  inputGroup: {
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 6,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    width: 80,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: Colors.border,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  inputSep: {
    fontSize: 28,
    color: Colors.textDim,
    marginTop: 20,
    fontWeight: "300",
  },
  lookupBtn: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  lookupGrad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  lookupText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  bottomFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomBar: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "rgba(6,6,14,0.95)",
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
