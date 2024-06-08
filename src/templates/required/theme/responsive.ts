import { Dimensions, PixelRatio } from 'react-native';

export const { width, height } = Dimensions.get('screen');
const BASE_LINE_WIDTH = 360;
const BASE_LINE_HEIGHT = 800;

// Utils
export function responsiveFontSize(size: number) {
  const scale = PixelRatio.getFontScale();
  return PixelRatio.roundToNearestPixel(size * scale);
}

export function responsivePx(px: number) {
  return PixelRatio.roundToNearestPixel(px);
}

// With Scale
export function hScale(size: number) {
  const h = height / BASE_LINE_HEIGHT;
  return PixelRatio.roundToNearestPixel(h * size);
}

export function wScale(size: number) {
  const w = width / BASE_LINE_WIDTH;
  return PixelRatio.roundToNearestPixel(w * size);
}

// With Percent
export function hp(percent: number) {
  return PixelRatio.roundToNearestPixel((percent * height) / 100);
}
export function wp(percent: number) {
  return PixelRatio.roundToNearestPixel((percent * width) / 100);
}
