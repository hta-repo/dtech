
import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./services/user.services";
import chatUserSlice from "./services/chat.services";

const reducer = {
  auth: authReducer,
  chat: chatUserSlice,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;