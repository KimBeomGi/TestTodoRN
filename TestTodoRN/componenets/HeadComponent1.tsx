import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HeadComponent1(){
  return(
    <View 
      style={styles.headerContainer}
    >
      <Text>오늘의 할 일</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer : {
    flex: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  }
})