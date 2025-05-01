import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenScriptId: null,
};

const scriptSlice = createSlice({
  initialState,
  name: 'script',
  reducers: {
    updateChosenId: (state, data) => {
      state.chosenScriptId = data.payload;
    },
  },
});

export const { updateChosenId } = scriptSlice.actions;
export default scriptSlice.reducer;
