import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>홈 스크린</Text>
      <Button
        title='할 일 화면으로 넘어가기'
        onPress={() => {
          navigation.navigate('TodoScreen1')
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