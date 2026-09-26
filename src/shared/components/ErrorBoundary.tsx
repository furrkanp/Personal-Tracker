import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/shared/design-system/Button';
import { Text, View } from 'react-native';

type Props = { children: ReactNode };
type State = { hasError: boolean };
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { if (__DEV__) console.error(error, info.componentStack); }
  render() { if (!this.state.hasError) return this.props.children; return <View><Text>Beklenmeyen bir hata oluştu.</Text><Button title="Tekrar dene" onPress={() => this.setState({ hasError: false })} /></View>; }
}
