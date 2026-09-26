import { Tabs } from 'expo-router';
import { useTheme } from '@/shared/theme/ThemeProvider';

export default function AppLayout() {
  const { colors } = useTheme();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary, headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: 'Ana sayfa' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Takvim' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Görevler' }} />
      <Tabs.Screen name="meals" options={{ title: 'Yemekler' }} />
      <Tabs.Screen name="workouts" options={{ title: 'Spor' }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analiz' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
