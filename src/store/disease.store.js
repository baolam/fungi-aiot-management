import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenDiseaseId: null,
};

const diseaseSlice = createSlice({
  initialState,
  name: 'disease',
  reducers: {
    updateChosenId: (state, data) => {
      state.chosenDiseaseId = data.payload;
    },
  },
});

export const { updateChosenId } = diseaseSlice.actions;
export default diseaseSlice.reducer;
