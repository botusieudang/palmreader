import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';
import { calculateNumerology } from '../services/numerology';
import type { NumerologyResult } from '../types/numerology';

export default function NumerologyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const isValid = fullName.trim().length >= 2 && day && month && year.length === 4;

  const handleCalculate = () => {
    setError('');
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (d < 1 || d > 31) { setError('Ngay sinh khong hop le'); return; }
    if (m < 1 || m > 12) { setError('Thang sinh khong hop le'); return; }
    if (y < 1900 || y > 2030) { setError('Nam sinh khong hop le'); return; }

    const dateStr = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    try {
      const result = calculateNumerology({ fullName: fullName.trim(), birthDate: dateStr });
      router.push({
        pathname: '/numerology-result',
        params: {
          result: JSON.stringify(result),
          name: fullName.trim(),
          birthDate: dateStr,
        },
      });
    } catch {
      setError('Khong the tinh toan. Vui long kiem tra lai thong tin.');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Than So Hoc</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Banner */}
          <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerIcon}>
              <MaterialCommunityIcons name="numeric" size={32} color="#06b6d4" />
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Than So Hoc Pythagore</Text>
              <Text style={styles.bannerSubtitle}>Giai ma cuoc doi qua nhung con so</Text>
            </View>
          </LinearGradient>

          {/* Info */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={18} color="#06b6d4" />
            <Text style={styles.infoText}>
              Nhap ho ten khai sinh va ngay thang nam sinh duong lich de phan tich than so hoc cua ban.
            </Text>
          </View>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ho va Ten (khai sinh)</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="VD: Nguyen Van A"
                placeholderTextColor={Colors.textDim}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Date Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngay Sinh (Duong lich)</Text>
            <View style={styles.dateRow}>
              <View style={[styles.inputWrap, styles.dateInput]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="DD"
                  placeholderTextColor={Colors.textDim}
                  value={day}
                  onChangeText={(t) => setDay(t.replace(/\D/g, '').slice(0, 2))}
                  keyboardType="number-pad"
                  maxLength={2}
                  textAlign="center"
                />
              </View>
              <Text style={styles.dateSep}>/</Text>
              <View style={[styles.inputWrap, styles.dateInput]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="MM"
                  placeholderTextColor={Colors.textDim}
                  value={month}
                  onChangeText={(t) => setMonth(t.replace(/\D/g, '').slice(0, 2))}
                  keyboardType="number-pad"
                  maxLength={2}
                  textAlign="center"
                />
              </View>
              <Text style={styles.dateSep}>/</Text>
              <View style={[styles.inputWrap, styles.yearInput]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="YYYY"
                  placeholderTextColor={Colors.textDim}
                  value={year}
                  onChangeText={(t) => setYear(t.replace(/\D/g, '').slice(0, 4))}
                  keyboardType="number-pad"
                  maxLength={4}
                  textAlign="center"
                />
              </View>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorWrap}>
              <Ionicons name="alert-circle" size={16} color="#ef4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Calculate Button */}
          <TouchableOpacity
            style={[styles.calcBtn, !isValid && styles.calcBtnDisabled]}
            onPress={handleCalculate}
            disabled={!isValid}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={isValid ? ['#0891b2', '#06b6d4'] : ['#374151', '#4b5563']}
              style={styles.calcBtnGradient}
            >
              <MaterialCommunityIcons name="calculator-variant" size={22} color="#fff" />
              <Text style={styles.calcBtnText}>Phan Tich Than So</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Features */}
          <View style={styles.featuresGrid}>
            {[
              { icon: 'trending-up', label: 'Duong Doi', desc: 'Con so chi phoi cuoc doi' },
              { icon: 'heart', label: 'Linh Hon', desc: 'Khao khat sau tham' },
              { icon: 'briefcase', label: 'Su Menh', desc: 'Nhiem vu cuoc doi' },
              { icon: 'grid', label: 'Bieu Do', desc: 'Ban do ngay sinh' },
              { icon: 'calendar', label: 'Nam Ca Nhan', desc: 'Du bao theo nam' },
              { icon: 'analytics', label: 'Dinh Cao', desc: 'Cac giai doan doi' },
            ].map((f) => (
              <View key={f.label} style={styles.featCard}>
                <Ionicons name={f.icon as any} size={20} color="#06b6d4" />
                <Text style={styles.featLabel}>{f.label}</Text>
                <Text style={styles.featDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18,
    borderRadius: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(6,182,212,0.2)',
  },
  bannerIcon: {
    width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(6,182,212,0.12)',
    borderWidth: 1, borderColor: 'rgba(6,182,212,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  bannerSubtitle: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  infoCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14,
    borderRadius: 14, backgroundColor: 'rgba(6,182,212,0.06)', borderWidth: 1,
    borderColor: 'rgba(6,182,212,0.12)', marginBottom: 24,
  },
  infoText: { flex: 1, fontSize: 12.5, color: Colors.textMuted, lineHeight: 18 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8, marginLeft: 4 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 14,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 15, color: Colors.textPrimary, paddingVertical: 14 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateInput: { flex: 1, justifyContent: 'center' },
  yearInput: { flex: 1.5, justifyContent: 'center' },
  dateSep: { fontSize: 20, color: Colors.textDim, fontWeight: '300' },
  errorWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12,
    borderRadius: 12, backgroundColor: 'rgba(239,68,68,0.08)', borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.15)', marginBottom: 16,
  },
  errorText: { fontSize: 13, color: '#ef4444' },
  calcBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 8, marginBottom: 28 },
  calcBtnDisabled: { opacity: 0.5 },
  calcBtnGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 16,
  },
  calcBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  featuresGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  featCard: {
    width: '31%', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 8,
    borderRadius: 14, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
  },
  featLabel: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary, marginTop: 8 },
  featDesc: { fontSize: 9, color: Colors.textDim, textAlign: 'center', marginTop: 2 },
});
