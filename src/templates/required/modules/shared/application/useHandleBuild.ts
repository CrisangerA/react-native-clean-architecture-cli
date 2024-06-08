import { BUILDING_MODULE_STRING } from '@config/constants';
import { ToastAndroid } from 'react-native';

export function showBuildingMessage(message?: string) {
  const msj = typeof message === 'string' ? message : '';
  ToastAndroid.show(
    `${message ? msj + ' ' : ''}${BUILDING_MODULE_STRING}`,
    ToastAndroid.SHORT,
  );
}
