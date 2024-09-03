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

import { store } from './store/store'
import { Provider } from 'react-redux'



import AppNavigator from './AppNavigator';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  

  return (
    <Provider store={store}>
      <AppNavigator/>
      
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 90
  }
});

export default App;
