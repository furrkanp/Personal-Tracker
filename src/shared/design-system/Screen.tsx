import { ReactNode } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { breakpointForWidth } from '@/shared/utils/responsive';

type ScreenProps = {
  children: ReactNode;
};

export function Screen({ children }: ScreenProps) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const breakpoint = breakpointForWidth(width);

  return (
    <SafeAreaView
      style={[
        styles.root,
        { backgroundColor: colors.background },
        breakpoint === 'desktop' && styles.desktop,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
  desktop: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1440,
  },
});
