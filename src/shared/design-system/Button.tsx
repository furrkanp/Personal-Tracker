import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/shared/theme/ThemeProvider';
export function Button({ title, onPress }: { title: string; onPress: () => void }) { const { colors } = useTheme(); return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={[styles.button, { backgroundColor: colors.primary }]}><Text style={styles.text}>{title}</Text></Pressable>; }
const styles = StyleSheet.create({ button: { minHeight: 44, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }, text: { color: '#fff', fontWeight: '600' } });
