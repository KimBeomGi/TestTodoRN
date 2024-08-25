import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';

export type TodoScreen1Props = NativeStackScreenProps<StackParamList, "TodoScreen1">

export default function TodoScreen1({navigation} :TodoScreen1Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>TodoScreen1</Text>
      <Button
        title='홈 화면으로 넘어가기'
        onPress={() => {
          navigation.navigate('HomeScreen')
        }}
      />
      <Button
        title='TodoScreen2 화면으로 넘어가기'
        onPress={() => {
          navigation.navigate('TodoScreen2')
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