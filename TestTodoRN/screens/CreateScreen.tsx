import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';
import { fbsignUp } from '../componenets/firebase/auth';

export type CreateScreenProps = NativeStackScreenProps<StackParamList, "CreateScreen">

export default function CreateScreen({navigation} :CreateScreenProps) {
  const emailRef = useRef<TextInput>(null)
  const pw1Ref = useRef<TextInput>(null)
  const pw2Ref = useRef<TextInput>(null)

  const [idValue, setIdValue] = useState("")
  const [pw1Value, setPw1Value] = useState("")
  const [pw2Value, setPw2Value] = useState("")

  const handleCreateLogin = async() => {
    // const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pw_regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[a-zA-Z0-9!@#$%^&*._-]{8,31}$/;
    if(email_regex.test(idValue) && (pw1Value === pw2Value) &&  pw_regex.test(pw1Value) && pw_regex.test(pw2Value)){
      try {
        await fbsignUp(idValue, pw1Value)
        navigation.navigate('HomeScreen')
      } catch (error) {
        console.log(error)
        Alert.alert('회원가입 실패', '회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    }else{
      if(!email_regex.test(idValue)){
        Alert.alert('잘못된 이메일', '이메일을 확인해주세요')
      }else if(!(pw1Value === pw2Value)){
        Alert.alert('잘못된 비밀번호', '비밀번호와 비밀번호 확인이 불일치합니다.')
      }else if(!pw_regex.test(pw1Value) || !pw_regex.test(pw2Value)){
        Alert.alert('잘못된 비밀번호', '비밀번호를 다시 확인해주세요.')
      }else{
        Alert.alert('안된다', '안된다고')
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CreateScreen</Text>
      <TextInput
        style={{
          borderBottomWidth: 1,
        }}
        ref={emailRef}
        placeholder='아이디'
        keyboardType='email-address'
        autoCapitalize="none"
        value={idValue}
        onChangeText={(text) => {
          setIdValue(text)
        }}
        onSubmitEditing={() => {
          pw1Ref.current?.focus()
        }}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
        }}
        ref={pw1Ref}
        placeholder='비밀번호'
        secureTextEntry={true}
        keyboardType='default'
        autoCapitalize="none"
        value={pw1Value}
        onChangeText={(text) => {
          setPw1Value(text)
        }}
        onSubmitEditing={() => {
          pw2Ref.current?.focus()
        }}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
        }}
        ref={pw2Ref}
        placeholder='비밀번호'
        secureTextEntry={true}
        keyboardType='default'
        autoCapitalize="none"
        value={pw2Value}
        onChangeText={(text) => {setPw2Value(text)}}
      />
      <Button
        title='생성하기'
        onPress={() => {
          handleCreateLogin()
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