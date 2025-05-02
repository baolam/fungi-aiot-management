import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenFungiId: null,
  chosenStageId: -1,
};

const fungiSlice = createSlice({
  initialState,
  name: 'fungi',
  reducers: {
    updateChosenId: (state, data) => {
      state.chosenFungiId = data.payload;
    },
    updateStage: (state, data) => {
      state.chosenStageId = data.payload;
    },
  },
});

export const { updateChosenId, updateStage } = fungiSlice.actions;
export default fungiSlice.reducer;
