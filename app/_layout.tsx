import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ReadingProvider } from '../context/ReadingContext';

const bgVideo = require('../assets/vd_bg.mp4');

export default function RootLayout() {
  const player = useVideoPlayer(bgVideo, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden').catch(() => {});
      NavigationBar.setBehaviorAsync('overlay-swipe').catch(() => {});
      NavigationBar.setBackgroundColorAsync('#0b0516').catch(() => {});
    }
  }, []);

  return (
    <ReadingProvider>
      <View style={styles.root}>
        {/* Global video background */}
        <VideoView
          player={player}
          style={styles.bgVideo}
          contentFit="cover"
          nativeControls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
        <View style={styles.bgOverlay} />

        <StatusBar style="light" translucent />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="capture"
            options={{ contentStyle: { backgroundColor: '#000' } }}
          />
        </Stack>
      </View>
    </ReadingProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0b0516',
  },
  bgVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(11, 5, 22, 0.82)',
  },
});
