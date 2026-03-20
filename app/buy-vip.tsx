import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';
import IAPManager, { IAP_PRODUCTS } from '../utils/IAPManager';

const { width: SW } = Dimensions.get('window');

const COMPARE_ROWS = [
  { label: 'Xem Chỉ Tay Cơ Bản', free: true, pro: true },
  { label: 'Xóa Tất Cả Quảng Cáo', free: false, pro: true },
  { label: 'Phân Tích Chi Tiết', free: false, pro: true },
  { label: 'Xem Tướng Mặt Nâng Cao', free: false, pro: true },
  { label: 'Tử Vi Hàng Tuần', free: false, pro: true },
];

const PLANS = [
  {
    id: 'weekly',
    title: 'Tuần',
    price: '$2.99',
    perDay: '$0.43/ngày',
    tag: '',
    icon: 'time-outline' as const,
  },
  {
    id: 'monthly',
    title: 'Tháng',
    price: '$5.99',
    perDay: '$0.20/ngày',
    tag: 'Phổ Biến',
    icon: 'calendar-outline' as const,
    savings: 'Tiết kiệm 53%',
  },
  {
    id: 'yearly',
    title: 'Năm',
    price: '$29.99',
    perDay: '$0.08/ngày',
    tag: 'Tốt Nhất',
    icon: 'trophy-outline' as const,
    savings: 'Tiết kiệm 81%',
  },
];

export default function BuyVipScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [iapManager] = useState(() => IAPManager.getInstance());
  const [products, setProducts] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const isProcessing = useRef(false);

  // Load real IAP data
  useEffect(() => {
    const loadIAP = async () => {
      await iapManager.refreshEntitlements();
      setProducts(iapManager.getInApp());
      setSubscriptions(iapManager.getSubscriptions());
    };
    loadIAP();
  }, []);

  // Build real plans from IAP data
  const getRealPlans = () => {
    const plans: any[] = [];
    const sub = subscriptions.find((s: any) => s.id === IAP_PRODUCTS.SUBSCRIPTION) || subscriptions[0];
    if (sub) {
      const offers = (sub as any).subscriptionOfferDetails || (sub as any).subscriptionOfferDetailsAndroid;
      if (offers && offers.length > 0) {
        const getPrice = (offer: any) => offer.pricingPhases?.pricingPhaseList?.[0]?.formattedPrice || sub.displayPrice || '';
        const weekly = offers.find((o: any) => o.basePlanId?.toLowerCase().includes('week'));
        const monthly = offers.find((o: any) => o.basePlanId?.toLowerCase().includes('month'));
        const yearly = offers.find((o: any) => o.basePlanId?.toLowerCase().includes('year'));
        if (weekly) plans.push({ id: 'weekly', title: 'Tuần', price: getPrice(weekly), perDay: '', tag: '', icon: 'time-outline' as const, productId: sub.id, offerToken: weekly.offerToken });
        if (monthly) plans.push({ id: 'monthly', title: 'Tháng', price: getPrice(monthly), perDay: '', tag: 'Phổ Biến', icon: 'calendar-outline' as const, productId: sub.id, offerToken: monthly.offerToken });
        if (yearly) plans.push({ id: 'yearly', title: 'Năm', price: getPrice(yearly), perDay: '', tag: 'Tốt Nhất', icon: 'trophy-outline' as const, productId: sub.id, offerToken: yearly.offerToken, savings: '' });
      }
    }
    return plans.length > 0 ? plans : PLANS; // Fallback to static plans
  };

  const displayPlans = getRealPlans();

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(1.1)).current;
  const flareAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(
    PLANS.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(30),
    })),
  ).current;
  const planBounce = useRef(new Animated.Value(1)).current;
  const featureAnims = useRef(COMPARE_ROWS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Hero entrance
    Animated.parallel([
      Animated.timing(heroOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(heroScale, { toValue: 1, duration: 800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // Features stagger
    featureAnims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1, duration: 400, delay: 300 + i * 80,
        easing: Easing.out(Easing.back(1.5)), useNativeDriver: true,
      }).start();
    });

    // Cards stagger
    const staggerAnims = cardAnims.flatMap((anim, i) => [
      Animated.delay(600 + i * 150),
      Animated.parallel([
        Animated.timing(anim.opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(anim.translateY, { toValue: 0, duration: 400, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
      ]),
    ]);
    Animated.sequence(staggerAnims).start();
  }, []);

  // Pulse CTA
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, easing: Easing.in(Easing.ease), useNativeDriver: true }),
      ]).start(({ finished }) => { if (finished) pulse(); });
    };
    pulse();
  }, []);

  // Flare
  useEffect(() => {
    const flare = () => {
      flareAnim.setValue(-1);
      Animated.timing(flareAnim, { toValue: 2, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
        .start(({ finished }) => { if (finished) setTimeout(flare, 2000); });
    };
    flare();
  }, []);

  const bouncePlan = () => {
    planBounce.setValue(0.95);
    Animated.spring(planBounce, { toValue: 1, friction: 3, tension: 200, useNativeDriver: true }).start();
  };

  const handlePurchase = async () => {
    if (loading || isProcessing.current) return;
    try {
      isProcessing.current = true;
      setLoading(true);
      const plan = displayPlans.find((p: any) => p.id === selectedPlan);
      if (!plan || !plan.productId) {
        Alert.alert('Thông báo', 'Gói này chưa sẵn sàng. Vui lòng thử lại sau.');
        return;
      }
      if (plan.offerToken) {
        await iapManager.requestPurchaseWithOffer(plan.productId, plan.offerToken, plan.id);
      } else {
        await iapManager.requestPurchase(plan.productId);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert('Lỗi', 'Không thể xử lý thanh toán. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      isProcessing.current = false;
    }
  };

  return (
    <View style={s.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24}}
      >
        {/* Hero (compact) */}
        {/* <Animated.View style={[s.heroSection, { opacity: heroOpacity, transform: [{ scale: heroScale }] }]}>
          <LinearGradient
            colors={['rgba(124,58,237,0.85)', 'rgba(155,111,255,0.75)', 'rgba(196,181,253,0.6)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.heroBg}
          >
            <View style={s.heroCircle1} />
            <View style={s.heroCircle2} />
            <View style={s.heroContent}>
              <View style={s.diamondWrap}>
                <Ionicons name="diamond" size={36} color={Colors.gold} />
              </View>
              <Text style={s.heroTitle}>Nâng Cấp Premium</Text>
              <Text style={s.heroSub}>Mở khóa toàn bộ trải nghiệm Palm Reader</Text>
            </View>
          </LinearGradient>
        </Animated.View> */}
        <TouchableOpacity
          style={s.closeBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <ImageBackground
          source={require("../assets/images/bg_premium.png")}
          style={{height: 400, marginTop: 0}}
          // resizeMode="contain"
        >
       
          <View
            style={{
              marginTop: 64,
              height: 280,
              justifyContent: "center",
              alignItems: "center",
            }}
          ><View style={{alignItems: "center", marginTop: 20}}>
            <Text style={{fontSize: 36, fontWeight: "800", color: Colors.textPrimary, marginBottom: -6}}>{"UPGRADE"}</Text>
            <Text style={{fontSize: 52, fontWeight: "800", color: Colors.gold, marginTop: 0}}>{"PREMIUM"}</Text>
            <Text style={{fontSize: 16, fontWeight: "bold", color: Colors.textPrimary}}>
              Mở khóa toàn bộ trải nghiệm Palm Reader
            </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Comparison Table - 3 columns with vertical dividers */}
        <View style={s.compareCard}>
          {/* Table header */}
          <View style={s.compareHeader}>
            <View style={{ flex: 1 }} />
            <View style={s.colDivider} />
            <Text style={s.compareHeaderLabel}>FREE</Text>
            <View style={s.colDivider} />
            <Text style={[s.compareHeaderLabel, s.compareHeaderPro]}>PRO</Text>
          </View>

          {/* Rows */}
          {COMPARE_ROWS.map((row, i) => (
            <Animated.View
              key={row.label}
              style={[
                s.compareRow,
                i < COMPARE_ROWS.length - 1 && s.compareRowBorder,
                {
                  opacity: featureAnims[i],
                  transform: [
                    {
                      translateY: featureAnims[i].interpolate({
                        inputRange: [0, 1],
                        outputRange: [15, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={s.compareLabel}>{row.label}</Text>
              <View style={s.colDivider} />
              <View style={s.compareBadge}>
                {row.free ? (
                  <View style={s.checkCircle}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                ) : (
                  <View style={s.crossCircle}>
                    <Ionicons
                      name="close"
                      size={14}
                      color="rgba(255,255,255,0.4)"
                    />
                  </View>
                )}
              </View>
              <View style={s.colDivider} />
              <View style={s.compareBadge}>
                {row.pro ? (
                  <View style={s.checkCirclePro}>
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  </View>
                ) : (
                  <View style={s.crossCircle}>
                    <Ionicons
                      name="close"
                      size={14}
                      color="rgba(255, 255, 255, 0.4)"
                    />
                  </View>
                )}
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Plans */}
        <Text style={s.sectionTitle}>Chọn gói của bạn</Text>
        <View style={s.plansWrap}>
          {displayPlans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const anim = cardAnims[index];
            return (
              <Animated.View
                key={plan.id}
                style={{
                  opacity: anim?.opacity ?? 1,
                  transform: [
                    { translateY: anim?.translateY ?? 0 },
                    { scale: isSelected ? planBounce : 1 },
                  ],
                }}
              >
                <TouchableOpacity
                  style={[s.planCard, isSelected && s.planCardActive]}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedPlan(plan.id);
                    bouncePlan();
                  }}
                >
                  {!!plan.tag && (
                    <View style={s.planTagWrap}>
                      <LinearGradient
                        colors={
                          plan.tag === "Tốt Nhất"
                            ? ["#f59e0b", "#ef4444"]
                            : ["#7c3aed", "#6d28d9"]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={s.planTag}
                      >
                        <Animated.View
                          style={[
                            StyleSheet.absoluteFill,
                            {
                              opacity: 0.35,
                              transform: [
                                {
                                  translateX: flareAnim.interpolate({
                                    inputRange: [-1, 2],
                                    outputRange: [-80, 160],
                                  }),
                                },
                              ],
                            },
                          ]}
                        >
                          <LinearGradient
                            colors={[
                              "transparent",
                              "rgba(255,255,255,0.8)",
                              "transparent",
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ width: 40, height: "100%" }}
                          />
                        </Animated.View>
                        <Text style={s.planTagText}>{plan.tag}</Text>
                      </LinearGradient>
                    </View>
                  )}

                  <View style={s.planRow}>
                    <View style={[s.radio, isSelected && s.radioActive]}>
                      {isSelected && <View style={s.radioInner} />}
                    </View>
                    <View style={s.planInfo}>
                      <View style={s.planTitleRow}>
                        <Ionicons
                          name={plan.icon}
                          size={18}
                          color={isSelected ? Colors.purple : Colors.textMuted}
                          style={{ marginRight: 8 }}
                        />
                        <Text
                          style={[s.planTitle, isSelected && s.planTitleActive]}
                        >
                          {plan.title}
                        </Text>
                      </View>
                      {plan.savings && (
                        <View style={s.savBadge}>
                          <Ionicons
                            name="trending-down-outline"
                            size={12}
                            color="#4ADE80"
                          />
                          <Text style={s.savText}>{plan.savings}</Text>
                        </View>
                      )}
                    </View>
                    <View style={s.priceWrap}>
                      <Text
                        style={[s.planPrice, isSelected && s.planPriceActive]}
                      >
                        {plan.price}
                      </Text>
                      <Text style={s.planPerDay}>{plan.perDay}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* CTA */}
        <Animated.View
          style={{ transform: [{ scale: pulseAnim }], marginTop: 8 }}
        >
          <TouchableOpacity activeOpacity={0.85} onPress={handlePurchase}>
            <LinearGradient
              colors={['#d4af37', '#f5d77a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.ctaBtn}
            >
              <Ionicons
                name="diamond"
                size={20}
                color="#1a0f3d"
                style={{ marginRight: 8 }}
              />
              <Text style={[s.ctaText, { color: '#1a0f3d' }]}>Upgrade Premium</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            Hủy bất cứ lúc nào. Thanh toán định kỳ.
          </Text>
          <View style={s.footerLinks}>
            <TouchableOpacity>
              <Text style={s.footerLink}>Điều khoản</Text>
            </TouchableOpacity>
            <Text style={s.footerDot}>·</Text>
            <TouchableOpacity>
              <Text style={s.footerLink}>Bảo mật</Text>
            </TouchableOpacity>
            <Text style={s.footerDot}>·</Text>
            <TouchableOpacity>
              <Text style={s.footerLink}>Khôi phục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  galaxyOverlay: {},
  closeBtn: {
    position: "absolute",
    top: 52,
    left: 20,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Hero (compact)
  heroSection: { paddingHorizontal: 20, paddingTop: 50, marginBottom: 20 },
  heroBg: {
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    overflow: "hidden",
    position: "relative",
  },
  heroCircle1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.08)",
    top: -30,
    right: -20,
  },
  heroCircle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.06)",
    bottom: -15,
    left: 20,
  },
  heroContent: { alignItems: "center", zIndex: 2 },
  diamondWrap: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    paddingTop: 100,
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    paddingHorizontal: 24,
    marginBottom: 16,
  },

  // Comparison table
  compareCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
    overflow: "hidden",
    marginTop: -100,
  },
  compareHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  compareHeaderLabel: {
    width: 56,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  colDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  compareHeaderPro: {
    color: Colors.gold,
  },
  compareRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  compareRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
  },
  compareLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  compareBadge: {
    width: 56,
    alignItems: "center",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(26, 168, 78, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkCirclePro: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  crossCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Plans
  plansWrap: { paddingHorizontal: 20, marginBottom: 8 },
  planCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "visible",
  },
  planCardActive: {
    borderColor: Colors.purple,
    backgroundColor: "rgba(139,92,246,0.12)",
  },
  planTagWrap: {
    position: "absolute",
    top: -11,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  planTag: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    overflow: "hidden",
  },
  planTagText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  planRow: { flexDirection: "row", alignItems: "center" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  radioActive: { borderColor: Colors.purple },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.purple,
  },
  planInfo: { flex: 1 },
  planTitleRow: { flexDirection: "row", alignItems: "center" },
  planTitle: { fontSize: 16, fontWeight: "700", color: Colors.textSecondary },
  planTitleActive: { color: Colors.textPrimary },
  savBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  savText: { fontSize: 12, fontWeight: "700", color: "#4ADE80" },
  priceWrap: { alignItems: "flex-end" },
  planPrice: { fontSize: 20, fontWeight: "900", color: Colors.textSecondary },
  planPriceActive: { color: Colors.purple },
  planPerDay: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textDim,
    marginTop: 2,
  },

  // CTA
  ctaBtn: {
    flexDirection: "row",
    borderRadius: 18,
    paddingVertical: 18,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "800" },

  // Footer
  footer: { alignItems: "center", paddingTop: 16, paddingBottom: 8 },
  footerText: { color: Colors.textDim, fontSize: 12, marginBottom: 8 },
  footerLinks: { flexDirection: "row", alignItems: "center" },
  footerLink: { color: Colors.textMuted, fontSize: 12, fontWeight: "600" },
  footerDot: { color: Colors.textDim, fontSize: 12, marginHorizontal: 8 },
});
