import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '@/shared/design-system/colors';

type Theme = keyof typeof colors;
type ThemeContextValue = {
  theme: Theme;
  colors: (typeof colors)[Theme];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const theme: Theme = scheme === 'dark' ? 'dark' : 'light';
  const value = useMemo(() => ({ theme, colors: colors[theme] }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return value;
}
