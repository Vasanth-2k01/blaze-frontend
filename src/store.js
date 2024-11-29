import { configureStore, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    getUserList: (state, action) => {
      state = action.payload;
      console.log(state,"state store");
      return state;
    },
  },
});

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

export const { getUserList } = userSlice.actions;
