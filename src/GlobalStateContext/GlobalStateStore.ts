import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './AuthSlice';
import commonPopUpReducer from './CommonPopUpSlice'

// Configure the store
const store = configureStore({
    reducer: {
      auth: authReducer,
      popUps: commonPopUpReducer,
    },
  });
  
// Export the store
export default store;