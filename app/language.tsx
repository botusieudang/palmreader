import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/theme';

const LANGUAGES = [
  { id: 1, code: 'vi', title: 'Tiếng Việt', flag: '🇻🇳' },
  { id: 2, code: 'en', title: 'English', flag: '🇺🇸' },
  { id: 3, code: 'ja', title: '日本語', flag: '🇯🇵' },
  { id: 4, code: 'ko', title: '한국어', flag: '🇰🇷' },
  { id: 5, code: 'zh', title: '中文', flag: '🇨🇳' },
  { id: 6, code: 'th', title: 'ภาษาไทย', flag: '🇹🇭' },
  { id: 7, code: 'es', title: 'Español', flag: '🇪🇸' },
  { id: 8, code: 'fr', title: 'Français', flag: '🇫🇷' },
  { id: 9, code: 'de', title: 'Deutsch', flag: '🇩🇪' },
  { id: 10, code: 'pt', title: 'Português', flag: '🇧🇷' },
  { id: 11, code: 'hi', title: 'हिन्दी', flag: '🇮🇳' },
  { id: 12, code: 'ar', title: 'العربية', flag: '🇸🇦' },
];

export default function LanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(1); // Default: Vietnamese
  const [isFirstTime, setIsFirstTime] = useState(true);

  // Check if coming from settings (language already saved) or first time
  useEffect(() => {
    AsyncStorage.getItem('palm_reader_language').then((lang) => {
      if (lang) {
        setIsFirstTime(false);
        // Pre-select saved language
        const saved = LANGUAGES.find((l) => l.code === lang);
        if (saved) setSelectedId(saved.id);
      }
    }).catch(() => {});
  }, []);

  const handleConfirm = async () => {
    const selected = LANGUAGES.find((l) => l.id === selectedId);
    if (selected) {
      await AsyncStorage.setItem('palm_reader_language', selected.code).catch(() => {});
    }
    if (isFirstTime) {
      // First time → go to onboarding
      router.replace('/onboarding');
    } else {
      // From settings → go back
      router.back();
    }
  };

  const renderItem = ({ item, index }: { item: (typeof LANGUAGES)[number]; index: number }) => {
    const isSelected = selectedId === item.id;
    return (
      <Animated.View entering={FadeInDown.delay(index * 40).duration(400)}>
        <TouchableOpacity
          style={[styles.itemCard, isSelected && styles.itemCardActive]}
          activeOpacity={0.8}
          onPress={() => setSelectedId(item.id)}
        >
          <View style={styles.itemLeft}>
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={[styles.itemTitle, isSelected && styles.itemTitleActive]}>
              {item.title}
            </Text>
          </View>

          <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
        {isFirstTime ? (
          <View style={{ width: 36 }} />
        ) : (
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Ngôn Ngữ</Text>
        <TouchableOpacity onPress={handleConfirm}>
          <Ionicons name="checkmark-circle" size={32} color={Colors.purple} />
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={LANGUAGES}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemCardActive: {
    borderColor: 'rgba(139,92,246,0.4)',
    backgroundColor: 'rgba(139,92,246,0.08)',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  flag: { fontSize: 28, marginRight: 14 },
  itemTitle: { fontSize: 16, color: Colors.textSecondary, fontWeight: '500' },
  itemTitleActive: { color: Colors.textPrimary, fontWeight: '700' },
  radioOuter: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.textDim,
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: Colors.purple },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.purple },
});
