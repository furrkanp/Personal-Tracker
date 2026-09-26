import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/shared/theme/ThemeProvider';

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  const { colors } = useTheme();

  return <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
});
