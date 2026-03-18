import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { FaceSection, FaceSectionId } from '../types/faceQuiz';
import { Colors } from '../constants/theme';

interface Props {
  sections: FaceSection[];
  activeSection: FaceSectionId;
  answeredCounts: Record<FaceSectionId, number>;
  onSelectSection: (id: FaceSectionId) => void;
}

export default function FaceSectionSelector({
  sections,
  activeSection,
  answeredCounts,
  onSelectSection,
}: Props) {
  return (
    <View style={styles.container}>
      {sections.map((sec) => {
        const isActive = sec.id === activeSection;
        const count = answeredCounts[sec.id];
        const isDone = count >= sec.questionCount;

        return (
          <TouchableOpacity
            key={sec.id}
            activeOpacity={0.7}
            onPress={() => onSelectSection(sec.id)}
            style={[
              styles.tab,
              isActive && {
                borderColor: `${sec.color}60`,
                backgroundColor: `${sec.color}10`,
              },
            ]}
          >
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: `${sec.color}20` },
              ]}
            >
              {isDone ? (
                <Ionicons name="checkmark-circle" size={20} color={sec.color} />
              ) : (
                <Ionicons name={sec.icon as any} size={16} color={sec.color} />
              )}
            </View>

            <Text
              style={[
                styles.name,
                isActive && { color: sec.color, fontWeight: '700' },
              ]}
              numberOfLines={1}
            >
              {sec.nameVi}
            </Text>

            <Text style={[styles.progress, isDone && { color: sec.color }]}>
              {isDone ? 'Xong' : `${count}/${sec.questionCount}`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 4,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  progress: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
