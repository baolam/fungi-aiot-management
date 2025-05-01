import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenFungiId: null,
};

const fungiSlice = createSlice({
  initialState,
  name: 'fungi',
  reducers: {
    updateChosenId: (state, data) => {
      state.chosenFungiId = data.payload;
    },
  },
});

export const { updateChosenId } = fungiSlice.actions;
export default fungiSlice.reducer;
