import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  AppError,
  ApplicationLayerError,
  DomainLayerError,
  InfrastuctureLayerError,
} from '../domain/model/error';
import { log } from '../domain/utils';

export function manageAppError(error: any, origin: string, other?: any) {
  if (__DEV__) {
    log(
      '[ManageAppError]',
      error,
      origin,
      Object.keys(error),
      Object.values(error),
    );
  } else {
    crashlytics().recordError(error, origin);
    analytics().logEvent('app_error', { ...error, ...other, origin });
  }

  if (
    error instanceof InfrastuctureLayerError ||
    error instanceof ApplicationLayerError ||
    error instanceof DomainLayerError
  ) {
    return new AppError(error.message, error.name);
  }

  return new AppError('[App error]: ' + origin);
}
