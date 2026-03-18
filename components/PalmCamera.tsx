import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../constants/theme';
import { BASE_HAND_PATH, REFERENCE_LINE_PATHS } from '../constants/palmQuizData';
import type { Gender } from '../types/reading';

const { width: SCREEN_W } = Dimensions.get('window');
const GUIDE_W = SCREEN_W * 0.82;
const GUIDE_H = GUIDE_W * 1.1;

interface PalmCameraProps {
  onCapture: (base64: string, uri: string) => void;
  onCancel: () => void;
  gender: Gender;
}

export default function PalmCamera({ onCapture, onCancel, gender }: PalmCameraProps) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturing, setCapturing] = useState(false);

  const isFemale = gender === 'female';

  const handleCapture = async () => {
    if (!cameraRef.current || capturing) return;
    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.7,
      });
      if (photo?.base64 && photo?.uri) {
        onCapture(photo.base64, photo.uri);
      }
    } catch (e) {
      console.warn('Camera capture error:', e);
    } finally {
      setCapturing(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.purple} size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Ionicons name="camera-outline" size={48} color={Colors.textMuted} />
        <Text style={styles.permText}>Cần quyền camera để chụp chỉ tay</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Cấp Quyền</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={{ marginTop: 16 }}>
          <Text style={styles.cancelText}>Quay Lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
      />

      {/* Guide overlay using SVG hand + palm lines */}
      <View style={styles.overlayContainer} pointerEvents="none">
        <View style={[styles.guideCenter, isFemale && { transform: [{ scaleX: -1 }] }]}>
          <Svg width={GUIDE_W} height={GUIDE_H} viewBox="0 0 300 320">
            {/* Hand outline */}
            <Path
              d={BASE_HAND_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {/* 4 palm lines */}
            {Object.entries(REFERENCE_LINE_PATHS).map(([key, line]) => (
              <Path
                key={key}
                d={line.d}
                fill="none"
                stroke={line.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                opacity={0.6}
              />
            ))}
          </Svg>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionBox} pointerEvents="none">
        <Text style={styles.instructionText}>
          {isFemale
            ? 'Đặt tay phải vào khung, ngửa lòng bàn tay lên'
            : 'Đặt tay trái vào khung, ngửa lòng bàn tay lên'}
        </Text>
      </View>

      {/* Gender badge */}
      <View style={styles.genderBadge} pointerEvents="none">
        <Ionicons
          name={isFemale ? 'female' : 'male'}
          size={16}
          color={isFemale ? '#ec4899' : '#8b5cf6'}
        />
        <Text style={[styles.genderBadgeText, { color: isFemale ? '#ec4899' : '#8b5cf6' }]}>
          {isFemale ? 'Nữ · Tay phải' : 'Nam · Tay trái'}
        </Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCapture}
          style={styles.captureBtn}
          disabled={capturing}
        >
          {capturing ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <View style={styles.captureBtnInner} />
          )}
        </TouchableOpacity>

        <View style={{ width: 52 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  permText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  permBtn: {
    backgroundColor: Colors.purple,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  cancelText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  instructionBox: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  genderBadge: {
    position: 'absolute',
    top: 95,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genderBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  cancelBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
  },
});
