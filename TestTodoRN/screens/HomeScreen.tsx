import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { fbSignOut } from '../componenets/firebase/auth';


export type HomeScreenProps = NativeStackScreenProps<StackParamList, "HomeScreen">

export default function HomeScreen({navigation} : HomeScreenProps) {
  let user = auth().currentUser
  const handleFirebaseSignOut = async () => {
    try {
      await fbSignOut()
      console.log('된다.')
    } catch (error) {
      console.log(error)
      console.log('안된다.')
    }
  }

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
      { user
        ?
        <Button
          title='로그아웃'
          onPress={() => {
            handleFirebaseSignOut()
          }}
        />
        :
        <Button
        title='로그인'
        onPress={() => {
          navigation.navigate('LoginScreen')
        }}
        />
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  }
});