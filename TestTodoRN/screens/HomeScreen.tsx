import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ViewComponent } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { fbDeleteUser, fbSignOut } from '../componenets/firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { decrement, increment, incrementByAmount } from '../store/features/counter/counterSlice';

export type HomeScreenProps = NativeStackScreenProps<StackParamList, "HomeScreen">


export default function HomeScreen({navigation} : HomeScreenProps) {
  // let user = auth().currentUser
  const count = useAppSelector((state) => state.counter.value)
  const user = useAppSelector((state) => state.auth.user)
  console.log('이것이 user다', user)
  const dispatch = useAppDispatch()

  

  const handleFirebaseSignOut = async () => {
    try {
      await fbSignOut()
      console.log('된다.')
    } catch (error) {
      console.log(error)
      console.log('안된다.')
    }
  }

  const handleFirebaseDeleteUser = async () => {
    try {
      await fbDeleteUser()
      console.log('된다.')
    } catch (error) {
      console.log(error)
      console.log('안된다.')
    }
  }
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Home Screen</Text> */}
      {/* <Text>홈 스크린</Text> */}
      {/* <Text>{count}</Text>
      <Button
        title='+'
        onPress={() => {dispatch(increment())}}
        />
      <Button
        title='-'
        onPress={() => {dispatch(decrement())}}
      />
      <Button
        title='+5'
        onPress={() => {dispatch(incrementByAmount(5))}}
      /> */}
      <View><Text>Welcome {user ? user.email : '익명'}</Text></View>
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
        <View>
          <Button
            title='로그아웃'
            onPress={() => {
              handleFirebaseSignOut()
            }}
          />
          <Button
            title='회원탈퇴'
            onPress={() => {
              handleFirebaseDeleteUser()
            }}
          />
        
        </View>

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