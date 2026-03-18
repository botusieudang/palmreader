import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/theme';
import {
  LIFE_PATH_MEANINGS,
  MISSING_NUMBER_MEANINGS,
  PERSONAL_YEAR_MEANINGS,
  PINNACLE_MEANINGS,
  CHALLENGE_MEANINGS,
  BIRTHDAY_MEANINGS,
  NUMBER_REPEAT_MEANINGS,
} from '../constants/numerologyData';
import type { NumerologyResult } from '../types/numerology';

const CYAN = '#06b6d4';
const CYAN_DIM = 'rgba(6,182,212,';

const TAB_LIST = [
  { key: 'overview', title: 'Tong Quan', icon: 'sparkles' },
  { key: 'chart', title: 'Bieu Do', icon: 'grid' },
  { key: 'career', title: 'Su Nghiep', icon: 'briefcase' },
  { key: 'health', title: 'Suc Khoe', icon: 'fitness' },
  { key: 'love', title: 'Tinh Yeu', icon: 'heart' },
  { key: 'future', title: 'Tuong Lai', icon: 'telescope' },
] as const;

type TabKey = typeof TAB_LIST[number]['key'];

export default function NumerologyResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ result: string; name: string; birthDate: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const result: NumerologyResult = useMemo(() => JSON.parse(params.result || '{}'), [params.result]);
  const lpKey = result.lifePathMaster || result.lifePath;
  const lpData = LIFE_PATH_MEANINGS[lpKey] || LIFE_PATH_MEANINGS[result.lifePath];
  const exKey = result.expressionMaster || result.expression;
  const exData = LIFE_PATH_MEANINGS[exKey] || LIFE_PATH_MEANINGS[result.expression];
  const suKey = result.soulUrgeMaster || result.soulUrge;
  const suData = LIFE_PATH_MEANINGS[suKey] || LIFE_PATH_MEANINGS[result.soulUrge];
  const pKey = result.personalityMaster || result.personality;
  const pData = LIFE_PATH_MEANINGS[pKey] || LIFE_PATH_MEANINGS[result.personality];

  const renderOverview = () => (
    <>
      {/* Life Path - Hero */}
      <View style={styles.heroCard}>
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.heroGradient}>
          <View style={styles.heroNumberWrap}>
            <Text style={styles.heroNumber}>{lpKey}</Text>
            {result.lifePathMaster && (
              <Text style={styles.heroMasterBadge}>MASTER</Text>
            )}
          </View>
          <Text style={styles.heroTitle}>Duong Doi - {lpData?.title}</Text>
          <Text style={styles.heroKeyword}>{lpData?.keyword}</Text>
          <Text style={styles.heroDesc}>{lpData?.description}</Text>
        </LinearGradient>
      </View>

      {/* Core Numbers Grid */}
      <Text style={styles.sectionLabel}>Cac Chi So Cot Loi</Text>
      <View style={styles.coreGrid}>
        <CoreNumberCard
          number={result.birthday}
          label="Ngay Sinh"
          desc={BIRTHDAY_MEANINGS[result.birthday] || ''}
          color="#f59e0b"
        />
        <CoreNumberCard
          number={exKey}
          label="Su Menh"
          desc={exData?.keyword || ''}
          color="#8b5cf6"
          master={result.expressionMaster}
        />
        <CoreNumberCard
          number={suKey}
          label="Linh Hon"
          desc={suData?.keyword || ''}
          color="#ec4899"
          master={result.soulUrgeMaster}
        />
        <CoreNumberCard
          number={pKey}
          label="Nhan Cach"
          desc={pData?.keyword || ''}
          color="#10b981"
          master={result.personalityMaster}
        />
      </View>

      {/* Strengths & Weaknesses */}
      <InfoSection title="Diem Manh" icon="shield-checkmark" color="#10b981" content={lpData?.strengths || ''} />
      <InfoSection title="Diem Yeu" icon="alert-circle" color="#ef4444" content={lpData?.weaknesses || ''} />
    </>
  );

  const renderChart = () => {
    const { birthChart } = result;
    const gridLabels = [[3, 6, 9], [2, 5, 8], [1, 4, 7]];

    return (
      <>
        {/* Birth Chart Grid */}
        <Text style={styles.sectionLabel}>Bieu Do Ngay Sinh</Text>
        <View style={styles.chartCard}>
          {birthChart.grid.map((row, ri) => (
            <View key={ri} style={styles.chartRow}>
              {row.map((count, ci) => {
                const num = gridLabels[ri][ci];
                const isPresent = count > 0;
                return (
                  <View
                    key={ci}
                    style={[styles.chartCell, isPresent && styles.chartCellActive]}
                  >
                    <Text style={[styles.chartNum, isPresent && styles.chartNumActive]}>
                      {num}
                    </Text>
                    {isPresent && (
                      <Text style={styles.chartCount}>
                        {'●'.repeat(Math.min(count, 4))}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Arrows */}
        {birthChart.arrows.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Mui Ten</Text>
            {birthChart.arrows.map((arrow, i) => (
              <View key={i} style={[styles.arrowCard, arrow.type === 'present' ? styles.arrowPresent : styles.arrowMissing]}>
                <Ionicons
                  name={arrow.type === 'present' ? 'arrow-forward-circle' : 'close-circle'}
                  size={20}
                  color={arrow.type === 'present' ? '#10b981' : '#ef4444'}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.arrowName}>{arrow.name} ({arrow.numbers.join('-')})</Text>
                  <Text style={styles.arrowMeaning}>{arrow.meaning}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Missing Numbers */}
        {birthChart.missingNumbers.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>So Thieu</Text>
            {birthChart.missingNumbers.map((num) => {
              const data = MISSING_NUMBER_MEANINGS[num];
              if (!data) return null;
              return (
                <View key={num} style={styles.missingCard}>
                  <View style={styles.missingNumWrap}>
                    <Text style={styles.missingNum}>{num}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.missingTitle}>{data.title}</Text>
                    <Text style={styles.missingMeaning}>{data.meaning}</Text>
                    <Text style={styles.missingAdvice}>💡 {data.advice}</Text>
                  </View>
                </View>
              );
            })}
          </>
        )}

        {/* Number Repeats */}
        {(() => {
          const digits = (params.birthDate || '').replace(/\D/g, '').split('').map(Number).filter(d => d > 0);
          const counts: Record<number, number> = {};
          digits.forEach(d => { counts[d] = (counts[d] || 0) + 1; });
          const repeats = Object.entries(counts).filter(([_, c]) => c >= 2);
          if (repeats.length === 0) return null;
          return (
            <>
              <Text style={styles.sectionLabel}>So Lap Lai</Text>
              {repeats.map(([num, count]) => {
                const key = `${num}_${Math.min(count, 3)}`;
                const meaning = NUMBER_REPEAT_MEANINGS[key];
                if (!meaning) return null;
                return (
                  <View key={num} style={styles.repeatCard}>
                    <Text style={styles.repeatNum}>
                      {num} x{count}
                    </Text>
                    <Text style={styles.repeatMeaning}>{meaning}</Text>
                  </View>
                );
              })}
            </>
          );
        })()}
      </>
    );
  };

  const renderCareer = () => (
    <>
      <InfoSection title="Su Nghiep (Duong Doi)" icon="trending-up" color={CYAN} content={lpData?.career || ''} />
      <InfoSection title="Su Menh Nghe Nghiep" icon="briefcase" color="#8b5cf6" content={exData?.career || ''} />
      <InfoSection title="Khao Khat Nghe Nghiep" icon="heart" color="#ec4899" content={suData?.career || ''} />

      {/* Pinnacles */}
      <Text style={styles.sectionLabel}>Cac Dinh Cao Su Nghiep</Text>
      {result.pinnacles.map((p, i) => (
        <View key={i} style={styles.pinnacleCard}>
          <View style={styles.pinnacleHeader}>
            <View style={styles.pinnacleNumWrap}>
              <Text style={styles.pinnacleNum}>{p.number}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.pinnacleTitle}>{p.period}</Text>
              <Text style={styles.pinnacleAge}>Tuoi: {p.ages}</Text>
            </View>
          </View>
          <Text style={styles.pinnacleMeaning}>{PINNACLE_MEANINGS[p.number] || ''}</Text>
        </View>
      ))}
    </>
  );

  const renderHealth = () => (
    <>
      <InfoSection title="Suc Khoe (Duong Doi)" icon="fitness" color="#10b981" content={lpData?.health || ''} />
      <InfoSection title="Suc Khoe (Su Menh)" icon="medkit" color="#f59e0b" content={exData?.health || ''} />

      {/* Missing numbers health advice */}
      {result.birthChart.missingNumbers.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>Can Bo Khuyet</Text>
          {result.birthChart.missingNumbers.slice(0, 5).map((num) => {
            const data = MISSING_NUMBER_MEANINGS[num];
            if (!data) return null;
            return (
              <View key={num} style={styles.healthAdviceCard}>
                <Text style={styles.healthAdviceTitle}>Thieu so {num}: {data.title}</Text>
                <Text style={styles.healthAdviceText}>{data.advice}</Text>
              </View>
            );
          })}
        </>
      )}
    </>
  );

  const renderLove = () => (
    <>
      <InfoSection title="Tinh Yeu (Duong Doi)" icon="heart" color="#ec4899" content={lpData?.love || ''} />
      <InfoSection title="Khao Khat Tinh Yeu" icon="flame" color="#f59e0b" content={suData?.love || ''} />
      <InfoSection title="An Tuong Ben Ngoai" icon="person" color="#8b5cf6" content={pData?.love || ''} />
    </>
  );

  const renderFuture = () => {
    const pyData = PERSONAL_YEAR_MEANINGS[result.personalYear.number];
    return (
      <>
        {/* Current Personal Year */}
        <View style={styles.heroCard}>
          <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.heroGradient}>
            <View style={styles.heroNumberWrap}>
              <Text style={styles.heroNumber}>{result.personalYear.number}</Text>
            </View>
            <Text style={styles.heroTitle}>Nam Ca Nhan {result.personalYear.year}</Text>
            <Text style={styles.heroKeyword}>{pyData?.theme}</Text>
            <Text style={styles.heroDesc}>{pyData?.description}</Text>
            {pyData?.advice && (
              <View style={styles.adviceWrap}>
                <Ionicons name="bulb" size={16} color={CYAN} />
                <Text style={styles.adviceText}>{pyData.advice}</Text>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Future Years */}
        <Text style={styles.sectionLabel}>Du Bao 9 Nam Toi</Text>
        {result.personalYears.map((py, i) => {
          const data = PERSONAL_YEAR_MEANINGS[py.number];
          return (
            <View key={i} style={[styles.yearCard, i === 0 && styles.yearCardCurrent]}>
              <View style={styles.yearHeader}>
                <Text style={styles.yearNum}>{py.number}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.yearTitle}>{py.year}</Text>
                  <Text style={styles.yearTheme}>{data?.theme}</Text>
                </View>
                {i === 0 && <View style={styles.currentBadge}><Text style={styles.currentBadgeText}>Hien tai</Text></View>}
              </View>
              <Text style={styles.yearDesc}>{data?.advice}</Text>
            </View>
          );
        })}

        {/* Challenges */}
        <Text style={styles.sectionLabel}>Cac Thu Thach Doi Nguoi</Text>
        {result.challenges.map((c, i) => (
          <View key={i} style={styles.challengeCard}>
            <View style={styles.challengeNumWrap}>
              <Text style={styles.challengeNum}>{c.number}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>{c.period}</Text>
              <Text style={styles.challengeMeaning}>{CHALLENGE_MEANINGS[c.number] || ''}</Text>
            </View>
          </View>
        ))}
      </>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'chart': return renderChart();
      case 'career': return renderCareer();
      case 'health': return renderHealth();
      case 'love': return renderLove();
      case 'future': return renderFuture();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{params.name}</Text>
          <Text style={styles.headerSubtitle}>{params.birthDate}</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={styles.tabBarContent}>
        {TAB_LIST.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.key ? CYAN : Colors.textDim}
            />
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        key={activeTab}
      >
        {renderContent()}

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          * Ket qua chi mang tinh chat giai tri va tham khao, khong phai loi khuyen chuyen nghiep.
        </Text>

        {/* New Analysis Button */}
        <TouchableOpacity style={styles.newBtn} onPress={() => router.back()}>
          <LinearGradient colors={['#0891b2', '#06b6d4']} style={styles.newBtnGradient}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.newBtnText}>Phan Tich Moi</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ---- Sub-components ----

function CoreNumberCard({ number, label, desc, color, master }: {
  number: number; label: string; desc: string; color: string; master?: number | null;
}) {
  return (
    <View style={[coreStyles.card, { borderColor: `${color}30` }]}>
      <View style={[coreStyles.numWrap, { backgroundColor: `${color}15` }]}>
        <Text style={[coreStyles.num, { color }]}>{number}</Text>
        {master && <Text style={[coreStyles.masterBadge, { color }]}>M</Text>}
      </View>
      <Text style={coreStyles.label}>{label}</Text>
      <Text style={coreStyles.desc} numberOfLines={2}>{desc}</Text>
    </View>
  );
}

function InfoSection({ title, icon, color, content }: {
  title: string; icon: string; color: string; content: string;
}) {
  return (
    <View style={infoStyles.card}>
      <View style={infoStyles.header}>
        <View style={[infoStyles.iconWrap, { backgroundColor: `${color}20` }]}>
          <Ionicons name={icon as any} size={18} color={color} />
        </View>
        <Text style={infoStyles.title}>{title}</Text>
      </View>
      <Text style={infoStyles.content}>{content}</Text>
    </View>
  );
}

// ---- Styles ----

const coreStyles = StyleSheet.create({
  card: {
    width: '48%', padding: 14, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, marginBottom: 10,
  },
  numWrap: {
    width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  num: { fontSize: 20, fontWeight: '800' },
  masterBadge: { fontSize: 8, fontWeight: '700', position: 'absolute', top: 2, right: 4 },
  label: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, marginBottom: 2 },
  desc: { fontSize: 10, color: Colors.textDim, lineHeight: 14 },
});

const infoStyles = StyleSheet.create({
  card: {
    padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: Colors.border, marginBottom: 12,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  iconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  content: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 10,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  headerSubtitle: { fontSize: 11, color: Colors.textMuted, marginTop: 1 },
  tabBar: { maxHeight: 44 },
  tabBarContent: { paddingHorizontal: 16, gap: 6 },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
  },
  tabActive: { backgroundColor: `${CYAN_DIM}0.1)`, borderColor: `${CYAN_DIM}0.3)` },
  tabText: { fontSize: 12, fontWeight: '500', color: Colors.textDim },
  tabTextActive: { color: CYAN, fontWeight: '600' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  sectionLabel: {
    fontSize: 15, fontWeight: '700', color: Colors.textPrimary,
    marginTop: 20, marginBottom: 12,
  },
  heroCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: `${CYAN_DIM}0.2)` },
  heroGradient: { padding: 22, alignItems: 'center' },
  heroNumberWrap: { alignItems: 'center', marginBottom: 12 },
  heroNumber: { fontSize: 56, fontWeight: '900', color: CYAN },
  heroMasterBadge: {
    fontSize: 10, fontWeight: '700', color: CYAN, letterSpacing: 2,
    backgroundColor: `${CYAN_DIM}0.15)`, paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 10, marginTop: 4,
  },
  heroTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  heroKeyword: {
    fontSize: 12, color: CYAN, fontWeight: '500', textAlign: 'center',
    marginTop: 4, marginBottom: 12,
  },
  heroDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, textAlign: 'center' },
  adviceWrap: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: `${CYAN_DIM}0.15)`,
  },
  adviceText: { flex: 1, fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
  coreGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  // Chart
  chartCard: {
    padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: Colors.border, gap: 8,
  },
  chartRow: { flexDirection: 'row', gap: 8 },
  chartCell: {
    flex: 1, aspectRatio: 1, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center',
  },
  chartCellActive: { backgroundColor: `${CYAN_DIM}0.08)`, borderColor: `${CYAN_DIM}0.25)` },
  chartNum: { fontSize: 24, fontWeight: '700', color: Colors.textDim },
  chartNumActive: { color: CYAN },
  chartCount: { fontSize: 8, color: CYAN, marginTop: 2, letterSpacing: 2 },
  // Arrows
  arrowCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14,
    borderRadius: 14, marginBottom: 8, borderWidth: 1,
  },
  arrowPresent: { backgroundColor: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.15)' },
  arrowMissing: { backgroundColor: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.15)' },
  arrowName: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  arrowMeaning: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  // Missing
  missingCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 14,
    borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1,
    borderColor: Colors.border, marginBottom: 8,
  },
  missingNumWrap: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  missingNum: { fontSize: 18, fontWeight: '700', color: '#ef4444' },
  missingTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  missingMeaning: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  missingAdvice: { fontSize: 11, color: '#f59e0b', marginTop: 4 },
  // Repeat
  repeatCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
    borderRadius: 14, backgroundColor: `${CYAN_DIM}0.04)`, borderWidth: 1,
    borderColor: `${CYAN_DIM}0.12)`, marginBottom: 8,
  },
  repeatNum: { fontSize: 16, fontWeight: '800', color: CYAN, minWidth: 40 },
  repeatMeaning: { flex: 1, fontSize: 12, color: Colors.textSecondary },
  // Pinnacle
  pinnacleCard: {
    padding: 14, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: Colors.border, marginBottom: 8,
  },
  pinnacleHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  pinnacleNumWrap: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: `${CYAN_DIM}0.12)`,
    alignItems: 'center', justifyContent: 'center',
  },
  pinnacleNum: { fontSize: 18, fontWeight: '700', color: CYAN },
  pinnacleTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  pinnacleAge: { fontSize: 11, color: Colors.textMuted },
  pinnacleMeaning: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  // Year
  yearCard: {
    padding: 14, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: Colors.border, marginBottom: 8,
  },
  yearCardCurrent: { borderColor: `${CYAN_DIM}0.3)`, backgroundColor: `${CYAN_DIM}0.05)` },
  yearHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  yearNum: { fontSize: 20, fontWeight: '800', color: CYAN, minWidth: 30, textAlign: 'center' },
  yearTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  yearTheme: { fontSize: 11, color: CYAN },
  currentBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
    backgroundColor: `${CYAN_DIM}0.15)`,
  },
  currentBadgeText: { fontSize: 10, fontWeight: '600', color: CYAN },
  yearDesc: { fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
  // Challenge
  challengeCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14,
    borderRadius: 14, backgroundColor: 'rgba(239,68,68,0.04)', borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.12)', marginBottom: 8,
  },
  challengeNumWrap: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(239,68,68,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  challengeNum: { fontSize: 18, fontWeight: '700', color: '#ef4444' },
  challengeTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  challengeMeaning: { fontSize: 12, color: Colors.textMuted, marginTop: 2, lineHeight: 18 },
  // Health
  healthAdviceCard: {
    padding: 14, borderRadius: 14, backgroundColor: 'rgba(16,185,129,0.04)',
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.12)', marginBottom: 8,
  },
  healthAdviceTitle: { fontSize: 13, fontWeight: '600', color: '#10b981', marginBottom: 4 },
  healthAdviceText: { fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
  // Footer
  disclaimer: {
    fontSize: 11, color: Colors.textDim, textAlign: 'center',
    marginTop: 20, marginBottom: 16, fontStyle: 'italic',
  },
  newBtn: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  newBtnGradient: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16,
  },
  newBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
