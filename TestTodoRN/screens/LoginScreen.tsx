import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
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
      console.log(emailValue, pwValue)
      await fbSignIn(emailValue, pwValue)
      // navigation.navigate("HomeScreen")
    } catch (error) {
      console.log(error)
    }
  }

  const handleFirebaseGoogleSignIn = async () => {
    try {
      await fbGoogleSignIn()
    } catch (error) {
      console.log(error)      
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
      {/* <Button
        title='구글로 로그인'
        color="#fb837f"
        onPress={() => {
          // Alert.alert('하잇')
          handleFirebaseGoogleSignIn()
        }}
      /> */}
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