import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@/shared/theme/ThemeProvider';
export function EmptyState({ title, description }: { title: string; description: string }) { const { colors } = useTheme(); return <Text accessibilityRole="text" style={[styles.text, { color: colors.text }]}>{title}\n{description}</Text>; }
const styles = StyleSheet.create({ text: { margin: 24, fontSize: 20, lineHeight: 30, textAlign: 'center' } });
