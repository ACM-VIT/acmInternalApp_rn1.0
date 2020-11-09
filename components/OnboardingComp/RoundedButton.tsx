import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GenericFunc } from '../../global';


export type RoudedButtonParams = {
    label:string,
    onPress:GenericFunc,
}

const RoundedButton = ({ label, onPress }:RoudedButtonParams) => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;