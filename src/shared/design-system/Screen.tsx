import { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { breakpointForWidth } from '@/shared/utils/responsive';
import { useWindowDimensions } from 'react-native';

export function Screen({ children }: { children: ReactNode }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const breakpoint = breakpointForWidth(width);
  return <SafeAreaView style={[styles.root, { backgroundColor: colors.background }, breakpoint === 'desktop' && styles.desktop]}>{children}</SafeAreaView>;
}
const styles = StyleSheet.create({ root: { flex: 1, paddingHorizontal: 16 }, desktop: { alignSelf: 'center', width: '100%', maxWidth: 1440 } });
