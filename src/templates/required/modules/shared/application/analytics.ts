import analytics from '@react-native-firebase/analytics';

export async function logEvent(name: string, params?: any) {
  if (__DEV__) {
    return;
  }
  await analytics().logEvent(name, params);
}
