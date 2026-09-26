import { StyleSheet, Text } from 'react-native';
import { Card } from '@/shared/design-system/Card';
import { useTheme } from '@/shared/theme/ThemeProvider';

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <Card>
      <Text accessibilityRole="header" style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.description, { color: colors.text }]}>{description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
