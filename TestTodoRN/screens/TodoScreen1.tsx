import React, { useEffect, useRef, useState } from 'react';
import database, { firebase } from '@react-native-firebase/database';

import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../componenets/types/mainType';

import firestore, { Filter } from '@react-native-firebase/firestore';
import { useAppSelector } from '../store/hooks';
import { reauthenticateWithPopup } from '@react-native-firebase/auth';

export type TodoScreen1Props = NativeStackScreenProps<StackParamList, "TodoScreen1">
type Todo = {
  id: string;
  createdAt: string;
  value: string;
  status: string;
};

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

export default function TodoScreen1({navigation} :TodoScreen1Props) {
  const user = useAppSelector((state) => state.auth.user)
  const todoInputRef = useRef<TextInput>(null);
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([])


  const todoCollection = firestore().collection('todos')

  const addTodo = async () => {
    if(!user){
      return
    }
    try {
      await todoCollection.add({
        createdAt: Date.now(),
        status: 'no',
        value: todoInputValue,
        userid: user.uid
      });
      setTodoInputValue('');
      console.log('Create Complete!');
    } catch (error:any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      return
    }
    // where와 orderBy에서 문제가 생겼는데, 이는 firebase 컬렉션의 색인에서 해결해야한다.
    const unsubscribe = todoCollection
    .where(Filter('userid', '==', user.uid))  // 현재 userid와 동일한 것만
    .orderBy('createdAt', 'desc') // 먼저 만들어진 날짜가 제일 아래로
    .onSnapshot(snapshot => {
      const todos_data = snapshot.docs.map(doc => {
        const docData = doc.data();
        const theDate = new Date(docData.createdAt);
        const year = theDate.getFullYear();
        const month = theDate.getMonth() + 1;
        const date = theDate.getDate();
        const day = weekDays[theDate.getDay()];
        const hours = theDate.getHours().toString().padStart(2,'0');
        const minutes = theDate.getMinutes().toString().padStart(2,'0');
        return {
          id: doc.id,
          createdAt: `${year}.${month}.${date}(${day}) ${hours}:${minutes}`,
          value: docData.value,
          status: docData.status,
        };
      });
  
      setTodos(todos_data);
    });
  
    // 컴포넌트가 언마운트될 때 구독 해제
    return () => unsubscribe();
  }, [])

  const handleStatus = (id:string, status:string) => {
    console.log(id, status)
    let chagnedStauts
    if(status === 'no'){
      chagnedStauts = 'progress'
    }else if(status === 'progress'){
      chagnedStauts = 'done'
    }else{
      chagnedStauts = 'no'
    }
    todoCollection.doc(id).update({
      status: chagnedStauts
    })
  }

  const handleDeleteTodo = (id:string, value:string) => {
    Alert.alert(`${value}`, `해당 할 일을 삭제하시겠습니까?`, [
      {
        text: 'Cancel',
        onPress: () => {
          // console.log('Cancel Pressed')
        },
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        todoCollection.doc(id).delete().then(() => {
          console.log(`${value} 삭제완료`)
        })
        // console.log('OK Pressed')
      }},
    ]);
    
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
      
      <FlatList
        data={todos}
        renderItem={({item}) => {
          return(
            <View style={styles.textList}>
              {/* <Text>{v1.id}</Text> */}
              <Text style={styles.textItem}>{item.createdAt.toString()}</Text>
              <Text style={styles.textItem}>{item.value}</Text>
              <TouchableOpacity
                onPress={() => {
                  handleStatus(item.id, item.status)
                }}
              >
                <Text style={styles.textItem}>
                  { item.status === 'no'
                    ? '😢'
                    : item.status === 'progress'
                      ? '😋'
                      : '😀'
                  }</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteTodo(item.id, item.value)
                }}
              >
                <Text style={styles.textItem}>🗑️</Text>
              </TouchableOpacity>

            </View>
          )
        }}
        keyExtractor={item => item.id}
      />
           
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  },
  textinput : {
    height: 120,
  },
  textList: {
    width: '100%',
    flexDirection: 'row',  // 한 줄로 나란히 배치
    // justifyContent: 'center',  // 여백을 균등하게 배분
    // alignItems: 'center',  // 수직 정렬
  },
  textItem: {
    marginHorizontal: 5,  // 텍스트 간의 간격
    marginVertical: 10,
    fontSize: 14,
    color: '#000000'
  },
});