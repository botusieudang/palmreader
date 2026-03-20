import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  Linking,
  Share,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/theme';
import { NativeAdComponent } from '../components/ads/NativeAdComponent';

const { width: SW } = Dimensions.get('window');

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.palmreader.app';
const PRIVACY_POLICY_URL = 'https://sites.google.com/view/palmreader-privacy';

const MENU_ITEMS = [
  {
    icon: 'globe-outline' as const,
    label: 'Ngôn Ngữ',
    subtitle: 'Thay đổi ngôn ngữ ứng dụng',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.12)',
    action: 'language',
  },
  {
    icon: 'share-social-outline' as const,
    label: 'Chia Sẻ App',
    subtitle: 'Chia sẻ với bạn bè',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.12)',
    action: 'share',
  },
  {
    icon: 'star-outline' as const,
    label: 'Đánh Giá',
    subtitle: 'Đánh giá trên cửa hàng',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    action: 'rate',
  },
  {
    icon: 'shield-checkmark-outline' as const,
    label: 'Chính Sách Bảo Mật',
    subtitle: 'Đọc chính sách của chúng tôi',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    action: 'policy',
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [ratingVisible, setRatingVisible] = useState(false);
  const [selectedStar, setSelectedStar] = useState(0);
  const [secretTaps, setSecretTaps] = useState(0);
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('palm_reader_vip').then((v) => {
      if (v === 'true') setIsVip(true);
    }).catch(() => {});
  }, []);

  const handleSecretTap = () => {
    const next = secretTaps + 1;
    setSecretTaps(next);
    if (next >= 5) {
      setShowSecretInput(true);
      setSecretTaps(0);
    }
  };

  const handleSecretSubmit = async () => {
    if (secretCode.trim().toUpperCase() === 'LUONGNE') {
      await AsyncStorage.setItem('palm_reader_vip', 'true').catch(() => {});
      setShowSecretInput(false);
      setSecretCode('');
      Alert.alert('🎉 VIP Activated', 'Tất cả tính năng đã được mở khóa!');
    } else {
      setShowSecretInput(false);
      setSecretCode('');
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Tải Palm Reader - Xem chỉ tay & tướng mặt AI! ${PLAY_STORE_URL}`,
      });
    } catch {}
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'language':
        router.push('/language');
        break;
      case 'share':
        onShare();
        break;
      case 'rate':
        setRatingVisible(true);
        break;
      case 'policy':
        Linking.openURL(PRIVACY_POLICY_URL);
        break;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài Đặt</Text>
        <View style={{ width: 36 }} />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* VIP Banner - ẩn khi đã mua VIP */}
        {!isVip && (
        <Animated.View entering={FadeInDown.delay(200).duration(600).springify().damping(18)}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/buy-vip')}>
            <LinearGradient
              colors={['#7c3aed', '#a78bfa', '#c4b5fd']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.vipBanner}
            >
              <View style={styles.vipContent}>
                <View style={styles.vipLeft}>
                  <View style={styles.vipIconWrap}>
                    <Ionicons name="diamond" size={24} color="#fff" />
                  </View>
                  <View>
                    <Text style={styles.vipTitle}>Nâng Cấp Premium</Text>
                    <Text style={styles.vipSubtitle}>Mở khóa tất cả & xóa quảng cáo</Text>
                  </View>
                </View>
                <View style={styles.vipArrow}>
                  <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
                </View>
              </View>
              <View style={styles.decoCircle1} />
              <View style={styles.decoCircle2} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        )}

        {/* Menu */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(600).springify().damping(18)}
          style={styles.menuCard}
        >
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.action}
              style={[styles.menuItem, index < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
              activeOpacity={0.7}
              onPress={() => handleMenuAction(item.action)}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={18} color={Colors.textDim} />
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* App Info */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(500)}
          style={styles.appInfo}
        >
          <Text style={styles.appVersion}>Phiên bản 1.0.0</Text>
          <TouchableOpacity activeOpacity={1} onPress={handleSecretTap}>
            <Text style={styles.appCopy}>Khám phá vận mệnh qua bàn tay</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>

      {/* Native Ad - bottom fixed */}
      <View style={styles.adWrap}>
        <NativeAdComponent />
      </View>

      {/* Secret Code Modal */}
      <Modal visible={showSecretInput} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => { setShowSecretInput(false); setSecretCode(''); }}
            >
              <Ionicons name="close-circle" size={30} color={Colors.textDim} />
            </TouchableOpacity>
            <Ionicons name="key" size={36} color={Colors.gold} style={{ marginBottom: 16 }} />
            <Text style={styles.modalTitle}>Nhập mã kích hoạt</Text>
            <TextInput
              style={styles.secretInput}
              value={secretCode}
              onChangeText={setSecretCode}
              placeholder="Nhập mã..."
              placeholderTextColor={Colors.textDim}
              autoCapitalize="characters"
              autoFocus
            />
            <TouchableOpacity
              style={[styles.rateBtn, !secretCode.trim() && { opacity: 0.4 }]}
              onPress={handleSecretSubmit}
              disabled={!secretCode.trim()}
            >
              <LinearGradient
                colors={secretCode.trim() ? ['#7c3aed', '#8b5cf6'] : ['#333', '#333']}
                style={styles.rateBtnGrad}
              >
                <Text style={styles.rateBtnText}>Xác Nhận</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal visible={ratingVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setRatingVisible(false)}
            >
              <Ionicons name="close-circle" size={30} color={Colors.textDim} />
            </TouchableOpacity>

            <LinearGradient colors={['#f59e0b', '#ef4444']} style={styles.modalIcon}>
              <Ionicons name="star" size={32} color="#fff" />
            </LinearGradient>

            <Text style={styles.modalTitle}>Bạn thích Palm Reader?</Text>
            <Text style={styles.modalSub}>
              Đánh giá của bạn giúp chúng tôi cải thiện ứng dụng!
            </Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setSelectedStar(star)}>
                  <Ionicons
                    name={star <= selectedStar ? 'star' : 'star-outline'}
                    size={42}
                    color={star <= selectedStar ? '#f59e0b' : Colors.textDim}
                    style={{ marginHorizontal: 5 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.rateBtn, selectedStar === 0 && { opacity: 0.4 }]}
              onPress={() => setRatingVisible(false)}
              disabled={selectedStar === 0}
            >
              <LinearGradient
                colors={selectedStar > 0 ? ['#7c3aed', '#8b5cf6'] : ['#333', '#333']}
                style={styles.rateBtnGrad}
              >
                <Text style={styles.rateBtnText}>Gửi Đánh Giá</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scroll: { paddingHorizontal: 20, paddingBottom: 120 },

  // VIP
  vipBanner: { borderRadius: 20, padding: 20, overflow: 'hidden', marginBottom: 24, position: 'relative' },
  vipContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 },
  vipLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  vipIconWrap: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  vipTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 3 },
  vipSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  vipArrow: { width: 32, height: 32, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  decoCircle1: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.08)', top: -30, right: -20 },
  decoCircle2: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.06)', bottom: -15, left: 40 },

  // Menu
  menuCard: { borderRadius: 20, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: Colors.border, marginBottom: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 18 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  iconCircle: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  menuTextWrap: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 2 },
  menuSub: { fontSize: 12, color: Colors.textMuted },

  // App Info
  appInfo: { alignItems: 'center', paddingVertical: 8 },
  appIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  appName: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 2 },
  appVersion: { fontSize: 13, fontWeight: '600', color: Colors.textMuted, marginBottom: 4 },
  appCopy: { fontSize: 12, color: Colors.textDim },
  adWrap: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  secretInput: {
    width: '100%', height: 50, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: Colors.border,
    textAlign: 'center', fontSize: 18, fontWeight: '700', color: Colors.textPrimary,
    marginBottom: 16, letterSpacing: 2,
  },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { width: '85%', backgroundColor: '#121218', borderRadius: 24, padding: 28, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  closeBtn: { position: 'absolute', right: 14, top: 14 },
  modalIcon: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 4 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 8 },
  modalSub: { fontSize: 14, textAlign: 'center', color: Colors.textMuted, lineHeight: 20, marginBottom: 20, paddingHorizontal: 8 },
  starRow: { flexDirection: 'row', marginBottom: 24 },
  rateBtn: { width: '100%', borderRadius: 16, overflow: 'hidden' },
  rateBtnGrad: { paddingVertical: 14, alignItems: 'center', borderRadius: 16 },
  rateBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
