import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  FadeIn,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import FaceDetection from '@react-native-ml-kit/face-detection';
import { useReading } from '../context/ReadingContext';
import { Colors } from '../constants/theme';
import { getRandomReading } from '../constants/readingResults';
import PalmCamera from '../components/PalmCamera';
import BannerAdComponent from '../components/ads/BannerAdComponent';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const IS_SHORT_SCREEN = SCREEN_H < 750;

// Fake analysis popup
function AnalyzingModal({
  visible,
  mode,
  onDone,
}: {
  visible: boolean;
  mode: 'palm' | 'face';
  onDone: () => void;
}) {
  const progress = useSharedValue(0);
  const dotOpacity1 = useSharedValue(0.3);
  const dotOpacity2 = useSharedValue(0.3);
  const dotOpacity3 = useSharedValue(0.3);
  const [statusText, setStatusText] = useState('Đang quét hình ảnh...');

  useEffect(() => {
    if (!visible) return;

    progress.value = withTiming(100, { duration: 4500, easing: Easing.out(Easing.cubic) });

    dotOpacity1.value = withRepeat(
      withSequence(withTiming(1, { duration: 400 }), withTiming(0.3, { duration: 400 })), -1
    );
    dotOpacity2.value = withDelay(200,
      withRepeat(withSequence(withTiming(1, { duration: 400 }), withTiming(0.3, { duration: 400 })), -1)
    );
    dotOpacity3.value = withDelay(400,
      withRepeat(withSequence(withTiming(1, { duration: 400 }), withTiming(0.3, { duration: 400 })), -1)
    );

    const t1 = setTimeout(() => setStatusText(mode === 'palm' ? 'Phân tích đường chỉ tay...' : 'Phân tích khuôn mặt...'), 1200);
    const t2 = setTimeout(() => setStatusText(mode === 'palm' ? 'Đọc đường tâm đạo, trí đạo...' : 'Nhận diện ngũ quan...'), 2500);
    const t3 = setTimeout(() => setStatusText('Tổng hợp kết quả...'), 3800);
    const t4 = setTimeout(() => onDone(), 5000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [visible]);

  const progressStyle = useAnimatedStyle(() => ({ width: `${progress.value}%` }));
  const dot1Style = useAnimatedStyle(() => ({ opacity: dotOpacity1.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dotOpacity2.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dotOpacity3.value }));
  const accentColor = mode === 'palm' ? '#8b5cf6' : '#ec4899';

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyles.overlay}>
        <View style={modalStyles.card}>
          <View style={[modalStyles.glow, { backgroundColor: `${accentColor}20` }]} />
          <Animated.View entering={FadeIn.duration(500)} style={[modalStyles.iconWrap, { backgroundColor: `${accentColor}15` }]}>
            <Ionicons name={mode === 'palm' ? 'scan' : 'eye'} size={36} color={accentColor} />
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(200).duration(400)} style={modalStyles.title}>Đang Phân Tích</Animated.Text>
          <View style={modalStyles.statusRow}>
            <Text style={modalStyles.statusText}>{statusText}</Text>
            <View style={modalStyles.dots}>
              <Animated.View style={[modalStyles.dot, dot1Style]} />
              <Animated.View style={[modalStyles.dot, dot2Style]} />
              <Animated.View style={[modalStyles.dot, dot3Style]} />
            </View>
          </View>
          <View style={modalStyles.progressTrack}>
            <Animated.View style={[modalStyles.progressFill, { backgroundColor: accentColor }, progressStyle]} />
          </View>
          <View style={modalStyles.items}>
            {(mode === 'palm'
              ? ['Tâm đạo', 'Trí đạo', 'Sinh đạo', 'Sự nghiệp']
              : ['Trán', 'Mắt', 'Mũi', 'Miệng']
            ).map((item, i) => (
              <Animated.View key={item} entering={FadeInUp.delay(600 + i * 300).duration(400)} style={modalStyles.item}>
                <Ionicons name="checkmark-circle" size={16} color={accentColor} />
                <Text style={modalStyles.itemText}>{item}</Text>
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function CaptureScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mode: rawMode, setImage, imageUri, setResult } = useReading();
  const mode = rawMode as 'palm' | 'face';
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const isPalm = mode === 'palm';
  const accentColor = isPalm ? Colors.purple : Colors.pink;

  // Detect face using Google ML Kit Face Detection
  const detectFace = async (uri: string): Promise<boolean> => {
    try {
      const faces = await FaceDetection.detect(uri, {
        landmarkMode: 'none',
        contourMode: 'none',
        classificationMode: 'none',
        performanceMode: 'fast',
      });
      console.log('Face detection result:', faces.length, 'faces found');
      return faces.length > 0;
    } catch (e) {
      console.warn('Face detection error:', e);
      // Nếu module lỗi → reject luôn, yêu cầu prebuild
      return false;
    }
  };

  // Palm: luôn cho qua
  const detectHand = async (): Promise<boolean> => {
    return true;
  };

  // Validate image: face detection cho mặt, tay luôn cho qua
  const validateImage = async (uri: string): Promise<boolean> => {
    if (isPalm) {
      return await detectHand();
    } else {
      return await detectFace(uri);
    }
  };

  const showDetectionError = () => {
    const title = isPalm ? 'Không tìm thấy bàn tay' : 'Không tìm thấy khuôn mặt';
    const msg = isPalm
      ? 'Không tìm thấy bàn tay trong ảnh. Vui lòng chụp lại với lòng bàn tay rõ ràng.'
      : 'Không tìm thấy khuôn mặt trong ảnh. Vui lòng chụp lại với khuôn mặt rõ ràng.';
    Alert.alert(title, msg, [{ text: 'Thử lại', style: 'default' }]);
  };

  const pickImage = async (useCamera: boolean) => {
    if (useCamera) {
      setShowCamera(true);
      return;
    }

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      if (asset.base64 && asset.uri) {
        const isValid = await validateImage(asset.uri);
        if (!isValid) {
          showDetectionError();
          return;
        }
        setImage(asset.base64, asset.uri);
        setError(null);
      }
    }
  };

  const handleCapture = async (base64: string, uri: string) => {
    const isValid = await validateImage(uri);
    if (!isValid) {
      showDetectionError();
      setShowCamera(false);
      return;
    }
    setImage(base64, uri);
    setShowCamera(false);
    setError(null);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
  };

  const handleAnalysisDone = () => {
    setAnalyzing(false);
    const reading = getRandomReading(mode);
    setResult(reading);
    router.push('/result');
  };

  // Camera view (palm with scanner, face without scanner)
  if (showCamera) {
    return (
      <PalmCamera
        onCapture={handleCapture}
        onCancel={() => setShowCamera(false)}
        mode={mode}
      />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AnalyzingModal visible={analyzing} mode={mode} onDone={handleAnalysisDone} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isPalm ? 'Xem Chỉ Tay' : 'Xem Tướng Mặt'}</Text>
        <View style={{ width: 36 }} />
      </View>

      {imageUri ? (
        /* ===== HAS IMAGE: show preview + analyze ===== */
        <>
          <View style={styles.previewArea}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <LinearGradient
              colors={['transparent', 'rgba(6,6,14,0.7)']}
              style={styles.previewOverlay}
            />
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionBtn, { flex: 1 }]} onPress={handleAnalyze}>
              <LinearGradient
                colors={isPalm ? ['#7c3aed', '#8b5cf6'] : ['#db2777', '#ec4899']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.actionBtnGradient}
              >
                <Ionicons name="sparkles" size={22} color="#fff" />
                <Text style={styles.actionBtnText}>Phân Tích</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.retakeBtn} onPress={() => setImage('', '')}>
              <Ionicons name="refresh" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {/* Banner Ad bottom */}
          <View style={styles.bannerAdWrap}>
            <BannerAdComponent />
          </View>
        </>
      ) : (
        /* ===== NO IMAGE: nice picker UI ===== */
        <View style={styles.pickerContainer}>
          {/* Hero icon */}
          <Animated.View
            entering={FadeInUp.delay(100).duration(600).springify().damping(18)}
            style={styles.heroSection}
          >
            <View style={[styles.heroGlow, { backgroundColor: `${accentColor}12` }]} />
            <LinearGradient
              colors={isPalm ? ['#1e1145', '#2d1b69'] : ['#1a1535', '#25163d']}
              style={styles.heroIcon}
            >
              <Ionicons
                name={isPalm ? 'hand-left' : 'person'}
                size={56}
                color={accentColor}
              />
            </LinearGradient>
            <Text style={styles.heroTitle}>
              {isPalm ? 'Chụp Lòng Bàn Tay' : 'Chụp Khuôn Mặt'}
            </Text>
            <Text style={styles.heroDesc}>
              {isPalm
                ? 'Đặt lòng bàn tay ngửa lên, chụp rõ các đường chỉ tay'
                : 'Chụp thẳng mặt, ánh sáng đều, không đội mũ'}
            </Text>
          </Animated.View>

          {/* Two option cards */}
          <View style={styles.optionCards}>
            <Animated.View style={{ flex: 1 }} entering={FadeInUp.delay(300).duration(500).springify().damping(18)}>
              <TouchableOpacity
                style={styles.optionCard}
                activeOpacity={0.8}
                onPress={() => pickImage(true)}
              >
                <LinearGradient
                  colors={isPalm ? ['#7c3aed', '#8b5cf6'] : ['#db2777', '#ec4899']}
                  style={styles.optionIconWrap}
                >
                  <Ionicons name="camera" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.optionTitle}>Chụp Ảnh</Text>
                <Text style={styles.optionDesc}>
                  {isPalm ? 'Mở camera sau' : 'Mở camera trước'}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ flex: 1 }} entering={FadeInUp.delay(450).duration(500).springify().damping(18)}>
              <TouchableOpacity
                style={styles.optionCard}
                activeOpacity={0.8}
                onPress={() => pickImage(false)}
              >
                <LinearGradient
                  colors={isPalm ? ['#7c3aed', '#8b5cf6'] : ['#db2777', '#ec4899']}
                  style={styles.optionIconWrap}
                >
                  <Ionicons name="images" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.optionTitle}>Thư Viện</Text>
                <Text style={styles.optionDesc}>Chọn ảnh có sẵn</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Native Ad */}
          <View style={styles.adWrap}>
            <NativeAdComponent />
          </View>
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={16} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center' },
  card: { width: SCREEN_W * 0.85, borderRadius: 28, backgroundColor: '#121218', padding: 32, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  glow: { position: 'absolute', top: -40, width: 160, height: 160, borderRadius: 80 },
  iconWrap: { width: 72, height: 72, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  statusText: { fontSize: 13, color: 'rgba(255,255,255,0.5)' },
  dots: { flexDirection: 'row', gap: 4 },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'rgba(255,255,255,0.6)' },
  progressTrack: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: 24, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  items: { width: '100%', gap: 10 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemText: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },

  // Preview (when image exists)
  previewArea: {
    marginHorizontal: 20, marginTop: 10, borderRadius: 24,
    height: IS_SHORT_SCREEN ? '50%' : '70%',
    overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: Colors.border,
  },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  previewOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
  },

  // Actions (when image exists)
  actions: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16,
  },
  actionBtn: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  actionBtnGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16,
  },
  actionBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  retakeBtn: {
    width: 52, height: 52, borderRadius: 16,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },

  // Picker (no image yet)
  pickerContainer: {
    flex: 1, justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120,
  },
  heroSection: {
    alignItems: 'center', marginBottom: 40,
  },
  heroGlow: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90, top: -20,
  },
  heroIcon: {
    width: 120, height: 120, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  heroTitle: {
    fontSize: 22, fontWeight: '800', color: Colors.textPrimary, marginBottom: 8,
  },
  heroDesc: {
    fontSize: 14, color: Colors.textMuted, textAlign: 'center',
    lineHeight: 22, paddingHorizontal: 20,
  },
  optionCards: {
    flexDirection: 'row', gap: 14,
  },
  optionCard: {
    alignItems: 'center',
    paddingVertical: 28, paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1, borderColor: Colors.border,
  },
  optionIconWrap: {
    width: 60, height: 60, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  optionTitle: {
    fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4,
  },
  optionDesc: {
    fontSize: 12, color: Colors.textDim, textAlign: 'center', lineHeight: 17,
  },

  // Banner ad on preview screen
  bannerAdWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  // Native ad on picker screen
  adWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Error
  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 20, marginBottom: 20, padding: 12, borderRadius: 12,
    backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
  },
  errorText: { flex: 1, fontSize: 12, color: '#ef4444' },
});
