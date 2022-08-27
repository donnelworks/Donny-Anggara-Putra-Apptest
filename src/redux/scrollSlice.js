import {createSlice} from '@reduxjs/toolkit';

const scrollSlice = createSlice({
  name: 'scroll',
  initialState: {
    scroll: 1,
  },
  reducers: {
    scrolling: (state, action) => {
      state.scroll = action.payload;
    },
  },
});

export const {scrolling} = scrollSlice.actions;
export default scrollSlice.reducer;
