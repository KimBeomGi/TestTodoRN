import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';
import { fbGoogleSignIn, fbSignIn } from '../componenets/firebase/auth';

export type LoginScreenProps = NativeStackScreenProps<StackParamList, "LoginScreen">

export default function LoginScreen({navigation} :LoginScreenProps) {
  const [emailValue, setEmailValue] = useState("")
  const [pwValue, setPwValue] = useState("")

  const handleFirebaseSignIn = async(emailValue:string, pwValue:string) => {
    if(!emailValue || !pwValue){
      console.log('다 채워넣어야지')
      return
    }
    try {
      await fbSignIn(emailValue, pwValue)
      // navigation.navigate("HomeScreen")
      ToastAndroid.show('로그인에 성공하셨습니다.', ToastAndroid.SHORT);
    } catch (error:any) {
      console.log(error.code)
      let errorMsg
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          errorMsg = "이메일 혹은 비밀번호가 일치하지 않습니다.";
          break
        case "auth/email-already-in-use":
          errorMsg = "이미 사용 중인 이메일입니다.";
          break
        case "auth/weak-password":
          errorMsg = "비밀번호는 6글자 이상이어야 합니다.";
          break
        case "auth/network-request-failed":
          errorMsg = "네트워크 연결에 실패 하였습니다.";
          break
        case "auth/invalid-email":
          errorMsg = "잘못된 이메일 형식입니다.";
          break
        case "auth/internal-error":
          errorMsg = "잘못된 요청입니다.";
          break
        case "auth/invalid-credential":
          errorMsg = "이메일과 비밀번호를 다시 확인해주세요."
          break
        case "auth/too-many-requests":
          errorMsg = "로그인 시도횟수를 초과했습니다. 잠시 후 시도해주세요."
          break
        default:
          errorMsg = "로그인에 실패 하였습니다.";
          break
      }
      // Alert.alert(`${errorMsg}`)
      ToastAndroid.show(`${errorMsg}`, ToastAndroid.SHORT);
    }
  }

  const handleFirebaseGoogleSignIn = async () => {
    try {
      await fbGoogleSignIn()
      ToastAndroid.show('로그인에 성공하셨습니다.', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error)
      ToastAndroid.show('로그인에 실패하셨습니다.', ToastAndroid.SHORT);
    }
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginScreen</Text>
      <TextInput
        style={{
            borderBottomWidth: 1,
        }}
        placeholder='아이디'
        keyboardType='email-address'
        autoCapitalize="none"
        value={emailValue}
        onChangeText={setEmailValue}
        />
      <TextInput
        style={{
          borderBottomWidth: 1,
        }}
        placeholder='비밀번호'
        secureTextEntry={true}
        keyboardType='default'
        autoCapitalize="none"
        value={pwValue}
        onChangeText={setPwValue}
      />
      <Button
        title='로그인'
        onPress={() => {
          handleFirebaseSignIn(emailValue, pwValue)
        }}
      />
      <Button
        title='이메일 계정 생성하기'
        color="#841584"
        onPress={() => {
          navigation.navigate("CreateScreen")
        }}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          handleFirebaseGoogleSignIn()
        }}
      >
        <Image source={require('../src/images/googlebtn1.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  }
});