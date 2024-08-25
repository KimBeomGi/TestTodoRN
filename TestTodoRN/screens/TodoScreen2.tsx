import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';

export type TodoScreen2Props = NativeStackScreenProps<StackParamList, "TodoScreen2">

export default function TodoScreen2({navigation} :TodoScreen2Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TodoScreen2</Text>
      <Button
        title='홈 화면으로 넘어가기'
        onPress={() => {
          navigation.navigate('HomeScreen')
        }}
      />
      <Button
        title='TodoScreen1 화면으로 넘어가기'
        onPress={() => {
          navigation.navigate('TodoScreen1')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  }
});