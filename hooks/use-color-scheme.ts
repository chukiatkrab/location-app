import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme(): 'light' | 'dark' | null {
  const scheme = useNativeColorScheme();
  return scheme === 'light' || scheme === 'dark' ? scheme : null;
}