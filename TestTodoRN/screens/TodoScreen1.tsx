import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';

export type TodoScreen1Props = NativeStackScreenProps<StackParamList, "TodoScreen1">

export default function TodoScreen1({navigation} :TodoScreen1Props) {
  const todoInputRef = useRef<TextInput>(null);
  // const testRef = useRef<TextInput>(null);
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todos, setTodos] = useState<string[]>([])

  const addTodo = () => {
    if(todoInputValue){
      setTodos([...todos, todoInputValue])
      setTodoInputValue("")
      // testRef.current?.focus()
    }
  }

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
      <TextInput
        ref={todoInputRef}
        placeholder='해야 할 일'
        editable={true}
        multiline={false}
        // numberOfLines={4}
        maxLength={40}
        onChangeText={(text) => {
          setTodoInputValue(text)
        }}
        keyboardType='default'
        autoCapitalize='none'
        onSubmitEditing = {() => {addTodo()}}
        value={todoInputValue}
        style={styles.textinput}
      />
      {
        todos.map((v1, k1) => {
          return(
            <View key={k1}>
              <Text>{v1}</Text>
            </View>
          )
        })
      }
      {/* <TextInput
        ref={testRef}
        placeholder='테스트중'
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  },
  textinput : {
    height: 120,
  }
});