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
import { StackParamList } from './componenets/types/mainType';
import LoginScreen from './screens/LoginScreen';
import CreateScreen from './screens/CreateScreen';
import auth, { FirebaseAuthTypes, onAuthStateChanged } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  // const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  
  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);




  return (
    <>
      <HeadComponent1/>
      <View><Text>Welcome {user ? user.email : '익명'}</Text></View>
      <View
        style={styles.mainContainer}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
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
            <Stack.Screen
              name="LoginScreen" 
              component={LoginScreen} 
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="CreateScreen" 
              component={CreateScreen}
              options={{
                headerShown: false,
                animation: 'none'
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
