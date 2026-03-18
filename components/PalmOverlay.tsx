import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  PALM_LINE_TEMPLATES,
  templateToSvgPath,
} from '../constants/palmLineTemplates';
import { Colors } from '../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH - 40;

interface PalmOverlayProps {
  imageUri: string;
  imageBase64?: string;
}

export default function PalmOverlay({ imageUri }: PalmOverlayProps) {
  const svgPaths = PALM_LINE_TEMPLATES.map((tmpl) => ({
    d: templateToSvgPath(tmpl.segments, IMAGE_SIZE, IMAGE_SIZE),
    color: tmpl.color,
    nameVi: tmpl.nameVi,
  }));

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />

      <Svg
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        style={styles.svgOverlay}
      >
        {svgPaths.map((line, i) => (
          <Path
            key={i}
            d={line.d}
            stroke={line.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={0.85}
          />
        ))}
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendRow}>
          {svgPaths.map((line, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: line.color }]} />
              <Text style={styles.legendText}>{line.nameVi}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.2)',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: 'cover',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  legend: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
  },
});
