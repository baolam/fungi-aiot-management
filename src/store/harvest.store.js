import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenHarvestId: null,
  // data: [],
  // control: [],
  // notifications: [],
  onlineDevices: {},
};

const harvestSlice = createSlice({
  initialState,
  name: 'harvest',
  reducers: {
    updateChosenId: (state, data) => {
      state.chosenHarvestId = data.payload;
    },
    addOnline: (state, data) => {
      state.onlineDevices = { ...state.onlineDevices, [data.payload]: true };
    },
    initalizeOnlineDevices: (state, data) => {
      state.onlineDevices = { ...data.payload };
    },
  },
});

export const { updateChosenId, addOnline, initalizeOnlineDevices } = harvestSlice.actions;
export default harvestSlice.reducer;
