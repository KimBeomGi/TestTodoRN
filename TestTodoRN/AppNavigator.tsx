import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
import { useAppDispatch, useAppSelector } from './store/hooks';
import { checkUser } from './store/features/auth/authSlice';

const Stack = createNativeStackNavigator<StackParamList>();
export default function AppNavigator() {

  // const [initializing, setInitializing] = useState(true);
  // const [loading, setLoading] = useState<boolean>(true);
  
  const count = useAppSelector((state) => state.counter.value)
  // const realUser = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  
  // useEffect(() => {
  //   auth().onAuthStateChanged(userState => {
  //     setUser(userState);
  //     dispatch(checkUser(user))

  //     if (loading) {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user:FirebaseAuthTypes.User | null) {
    setUser(user);
    dispatch(checkUser(user))
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(!user){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
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
    )
  }

  return(
    <>
      <HeadComponent1/>
      {/* <View><Text>Welcome {user ? user.email : '익명'}</Text></View> */}
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
              // initialParams={{user:user}}
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
            {/* <Stack.Screen
              name="LoginScreen" 
              component={LoginScreen} 
              options={{
                headerShown: false,
                animation: 'none'
              }}
            /> */}
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
  )
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