import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import HeadComponent1 from './componenets/HeadComponent1';
import TodoScreen1 from './screens/TodoScreen1';
import TodoScreen2 from './screens/TodoScreen2';


type StackParamList = {
  HomeScreen: undefined;
  TodoScreen1: undefined;
  TodoScreen2: undefined;
  // TodoScreen1: { userId: string };
  // TodoScreen2: { sort: 'latest' | 'top' } | undefined;
};


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <>
      <HeadComponent1/>
      <View
        style={styles.mainContainer}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="HomeScreen" 
              component={HomeScreen} 
              options={{
                headerShown: false,
                animation: 'none'
              }}
              />
            <Stack.Screen
              name="TodoScreen1" 
              component={TodoScreen1} 
              options={{
                headerShown: false,
                animation: 'slide_from_left'
              }}
            />
            <Stack.Screen
              name="TodoScreen2" 
              component={TodoScreen2} 
              options={{
                headerShown: false,
                animation: 'slide_from_bottom'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  }
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default App;
