import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReading } from '../context/ReadingContext';
import { getReading } from '../services/api';
import { Colors } from '../constants/theme';
import { BASE_HAND_PATH, REFERENCE_LINE_PATHS } from '../constants/palmQuizData';
import PalmCamera from '../components/PalmCamera';
import type { Gender } from '../types/reading';

const { width: SCREEN_W } = Dimensions.get('window');

export default function CaptureScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { mode, gender, setGender, setImage, imageUri, imageBase64, setResult } = useReading();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPalmCamera, setShowPalmCamera] = useState(false);

  const isPalm = mode === 'palm';
  const accentColor = isPalm ? Colors.purple : Colors.pink;

  const pickImage = async (useCamera: boolean) => {
    // For palm mode camera, use custom PalmCamera with guide overlay
    if (useCamera && isPalm) {
      setShowPalmCamera(true);
      return;
    }

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      quality: 0.7,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
    };

    const result = useCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      if (asset.base64 && asset.uri) {
        setImage(asset.base64, asset.uri);
        setError(null);
      }
    }
  };

  const handlePalmCapture = (base64: string, uri: string) => {
    setImage(base64, uri);
    setShowPalmCamera(false);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setError(null);

    try {
      const response = await getReading(mode, imageBase64);
      if (response.success && response.reading) {
        setResult(response.reading);
        router.push('/result');
      } else {
        setError(response.error || 'Không thể phân tích. Vui lòng thử lại.');
      }
    } catch (e: any) {
      setError(e.message || 'Lỗi kết nối. Kiểm tra mạng và thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Show custom palm camera with guide overlay
  if (showPalmCamera) {
    return (
      <PalmCamera
        onCapture={handlePalmCapture}
        onCancel={() => setShowPalmCamera(false)}
        gender={gender || 'male'}
      />
    );
  }

  // Gender selection step for palm mode
  if (isPalm && !gender) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Xem Chỉ Tay</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Gender selection */}
        <View style={styles.genderContainer}>
          <Text style={styles.genderTitle}>Bạn là Nam hay Nữ?</Text>
          <Text style={styles.genderSubtitle}>
            Chọn giới tính để hiển thị khung tay phù hợp
          </Text>

          <View style={styles.genderOptions}>
            {/* Male - Left hand */}
            <TouchableOpacity
              style={styles.genderCard}
              activeOpacity={0.7}
              onPress={() => setGender('male')}
            >
              <LinearGradient
                colors={['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.05)']}
                style={styles.genderCardGradient}
              >
                <View style={styles.genderIconWrap}>
                  <Svg width="100%" height="100%" viewBox="0 0 300 320">
                    <Path d={BASE_HAND_PATH} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeLinejoin="round" />
                    {Object.entries(REFERENCE_LINE_PATHS).map(([k, l]) => (
                      <Path key={k} d={l.d} fill="none" stroke={l.color} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
                    ))}
                  </Svg>
                </View>
                <Text style={styles.genderLabel}>Nam</Text>
                <Text style={styles.genderHint}>Tay trái</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Female - Right hand (flipped) */}
            <TouchableOpacity
              style={styles.genderCard}
              activeOpacity={0.7}
              onPress={() => setGender('female')}
            >
              <LinearGradient
                colors={['rgba(236,72,153,0.15)', 'rgba(236,72,153,0.05)']}
                style={styles.genderCardGradient}
              >
                <View style={[styles.genderIconWrap, { transform: [{ scaleX: -1 }] }]}>
                  <Svg width="100%" height="100%" viewBox="0 0 300 320">
                    <Path d={BASE_HAND_PATH} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} strokeLinejoin="round" />
                    {Object.entries(REFERENCE_LINE_PATHS).map(([k, l]) => (
                      <Path key={k} d={l.d} fill="none" stroke={l.color} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
                    ))}
                  </Svg>
                </View>
                <Text style={styles.genderLabel}>Nữ</Text>
                <Text style={styles.genderHint}>Tay phải</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isPalm ? 'Xem Chỉ Tay' : 'Xem Tướng Mặt'}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Guide text */}
      <View style={styles.guideBox}>
        <Ionicons name="information-circle-outline" size={18} color={accentColor} />
        <Text style={styles.guideText}>
          {isPalm
            ? 'Đặt lòng bàn tay ngửa lên, chụp rõ các đường chỉ tay'
            : 'Chụp thẳng mặt, ánh sáng đều, không đội mũ'}
        </Text>
      </View>

      {/* Image Preview Area */}
      <View style={styles.previewArea}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name={isPalm ? 'hand-left-outline' : 'person-outline'}
              size={64}
              color="rgba(255,255,255,0.1)"
            />
            <Text style={styles.placeholderText}>
              Chụp ảnh hoặc chọn từ thư viện
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {!imageUri ? (
          <>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => pickImage(true)}
            >
              <LinearGradient
                colors={isPalm ? ['#7c3aed', '#8b5cf6'] : ['#db2777', '#ec4899']}
                style={styles.actionBtnGradient}
              >
                <Ionicons name="camera" size={22} color="#fff" />
                <Text style={styles.actionBtnText}>Chụp Ảnh</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => pickImage(false)}
            >
              <View style={styles.actionBtnOutline}>
                <Ionicons name="images" size={22} color={accentColor} />
                <Text style={[styles.actionBtnText, { color: accentColor }]}>Thư Viện</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {isPalm ? (
              /* Palm mode: go to quiz */
              <TouchableOpacity
                style={[styles.actionBtn, { flex: 1 }]}
                onPress={() => router.push('/quiz')}
              >
                <LinearGradient
                  colors={['#7c3aed', '#8b5cf6']}
                  style={styles.actionBtnGradient}
                >
                  <Ionicons name="list" size={22} color="#fff" />
                  <Text style={styles.actionBtnText}>Tiếp Tục</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              /* Face mode: go to face quiz */
              <TouchableOpacity
                style={[styles.actionBtn, { flex: 1 }]}
                onPress={() => router.push('/face-quiz')}
              >
                <LinearGradient
                  colors={['#db2777', '#ec4899']}
                  style={styles.actionBtnGradient}
                >
                  <Ionicons name="list" size={22} color="#fff" />
                  <Text style={styles.actionBtnText}>Tiếp Tục</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => setImage('', '')}
              disabled={loading}
            >
              <Ionicons name="refresh" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Error */}
      {error && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={16} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const CARD_SIZE = (SCREEN_W - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
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
  // Gender selection styles
  genderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  genderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  genderSubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 40,
    textAlign: 'center',
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 16,
  },
  genderCard: {
    width: CARD_SIZE,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  genderCardGradient: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  genderIconWrap: {
    width: CARD_SIZE - 48,
    height: CARD_SIZE - 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  genderHandIcon: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  genderLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  genderHint: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  // Rest of styles
  guideBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  guideText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  previewArea: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  placeholderText: {
    fontSize: 13,
    color: Colors.textDim,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  actionBtnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(139,92,246,0.3)',
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  retakeBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    color: '#ef4444',
  },
});
