import { configureStore } from '@reduxjs/toolkit'
// ...
// import counterReducer from './slices/counter/counterSlice'
import counterReducer from './features/counter/counterSlice'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
    // counter:counterReducer
    counter: counterReducer,
    auth: authReducer
  },
  // 다음이 middleware 추가 코드이다.
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;