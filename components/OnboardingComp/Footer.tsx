import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { GenericFunc } from '../../global';

import RoundedButton from './RoundedButton';

export type FooterParams  = {
    backgroundColor :string,
    rightButtonLabel? :string,
    rightButtonPress? :GenericFunc
    leftButtonLabel :string,
    leftButtonPress :GenericFunc
}

const Footer = ({
  backgroundColor,
  rightButtonLabel = " ",
  rightButtonPress = ()=>{},
  leftButtonLabel = " ",
  leftButtonPress = ()=>{},
}:FooterParams) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.21;
  const FOOTER_PADDING = windowWidth * 0.1;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: leftButtonLabel ? 'space-between' : 'flex-end',
        height: HEIGHT,
        backgroundColor,
        opacity: 0.6,
        alignItems: 'center',
        paddingHorizontal: FOOTER_PADDING
      }}
    >
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
      <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
    </View>
  );
};

export default Footer;