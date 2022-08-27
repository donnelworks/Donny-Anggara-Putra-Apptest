import {configureStore} from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import scrollReducer from './scrollSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    scroll: scrollReducer,
  },
});
