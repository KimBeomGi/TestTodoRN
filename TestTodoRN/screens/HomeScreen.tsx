import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, ToastAndroid, View, ViewComponent } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { fbDeleteUser, fbSignOut } from '../componenets/firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { decrement, increment, incrementByAmount } from '../store/features/counter/counterSlice';
import firestore, { Filter } from '@react-native-firebase/firestore';

export type HomeScreenProps = NativeStackScreenProps<StackParamList, "HomeScreen">


export default function HomeScreen({navigation} : HomeScreenProps) {
  // let user = auth().currentUser
  const count = useAppSelector((state) => state.counter.value)
  const user = useAppSelector((state) => state.auth.user)
  console.log('이것이 user다', user)
  const dispatch = useAppDispatch()

  const todoCollection = firestore().collection('todos')
  

  const handleFirebaseSignOut = async () => {
    try {
      await fbSignOut()
      console.log('된다.')
    } catch (error) {
      console.log(error)
      console.log('안된다.')
    }
  }

  const deleteUsersRecord = async () => {
    try {
      const records = await todoCollection.where(Filter('userid', '==', user?.uid)).get();
      const batch = firestore().batch();
  
      records.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
      console.log('사용자의 기록이 삭제되었습니다.');
    } catch (error) {
      console.log('기록 삭제 중 에러 발생:', error);
    }
  };

  const handleFirebaseDeleteUser = async () => {
    Alert.alert('회원 탈퇴', '오늘의 할 일에서 탈퇴하시겠습니까?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel Pressed')
        },
        style: 'cancel',
      },
      {text: 'OK', onPress: async () =>{ 
        console.log('OK Pressed')
        try {
          await deleteUsersRecord()
          .then(() => {
            fbDeleteUser()
          })
          ToastAndroid.show('회원 탈퇴에 성공하셨습니다.', ToastAndroid.SHORT);
        } catch (error) {
          console.log(error)
          ToastAndroid.show('회원 탈퇴에 실패했습니다.', ToastAndroid.SHORT);
        }
      }},
    ]);
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