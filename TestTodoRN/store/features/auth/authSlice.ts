import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Define a type for the slice state
interface AuthState {
  user: FirebaseAuthTypes.User | null
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    checkUser: (state, action: PayloadAction<FirebaseAuthTypes.User | null>) => {
      state.user = action.payload
    },
  },
})

export const { checkUser } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.user

export default authSlice.reducer