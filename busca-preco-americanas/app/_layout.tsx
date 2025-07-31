import { Slot } from 'expo-router';
import { SafeAreaView, Platform } from 'react-native';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AppProvider } from '@/context/AppContext';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  useEffect(() => {
    // Força paisagem
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Oculta a navigation bar (Android)
    if (Platform.OS === 'android') {
      import('expo-navigation-bar')
        .then((NavigationBar) => {
          NavigationBar.setVisibilityAsync('hidden'); // ✅ Apenas isso
        })
        .catch(() => {
          console.warn('expo-navigation-bar não disponível');
        });
    }
  }, []);

  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden />
        <Slot />
      </SafeAreaView>
      <Toast />
    </AppProvider>
  );
}