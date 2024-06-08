import { StyleSheet } from 'react-native';
import { hScale, wScale } from './responsive';

export const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumnEnd: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  flatList: {
    paddingHorizontal: wScale(20),
    paddingVertical: hScale(12),
  },
  w20: {
    width: '25%',
  },
  w75: {
    width: '75%',
  },
  w80: {
    width: '80%',
  },
  w90: {
    width: '90%',
  },
  w100: {
    width: '100%',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceCenter: {
    justifyContent: 'center',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  flex1: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: wScale(20),
    paddingVertical: hScale(10),
    flex: 1,
  },
  selfCenter: {
    alignSelf: 'center',
  },
  bgTranslucent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
});
