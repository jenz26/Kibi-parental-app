import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import blogReducer from '../features/blog/blogSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    profile: profileReducer,
  },
});

export default store;