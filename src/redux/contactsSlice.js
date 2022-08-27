import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {Url} from '../utils';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async () => {
    const res = await axios.get(`${Url.api}contact`);
    return res.data.data;
  },
);

const contactEntity = createEntityAdapter({
  selectId: contact => contact.id,
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactEntity.getInitialState(),
  extraReducers: {
    [getContacts.fulfilled]: (state, action) => {
      contactEntity.setAll(state, action.payload);
    },
  },
});

export const contactSelectors = contactEntity.getSelectors(
  state => state.contacts,
);
export default contactsSlice.reducer;
