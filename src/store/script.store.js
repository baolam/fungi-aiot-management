import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenScriptId: null,
  refreshCode: -1,
};

const scriptSlice = createSlice({
  initialState,
  name: 'script',
  reducers: {
    updateChosenId: (state, data) => {
      state.chosenScriptId = data.payload;
    },
    updateRefreshCode: (state, data) => {
      state.refreshCode = data.payload;
    },
  },
});

export const { updateChosenId, updateRefreshCode } = scriptSlice.actions;
export default scriptSlice.reducer;
