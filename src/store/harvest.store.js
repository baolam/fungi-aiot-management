import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenHarvestId: null,
  // data: [],
  // control: [],
  // notifications: [],
  onlineDevices: {},
  refreshCode: -1,
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
    updateRefreshCode: (state, data) => {
      state.refreshCode = data.payload;
    },
  },
});

export const { updateChosenId, addOnline, initalizeOnlineDevices, updateRefreshCode } =
  harvestSlice.actions;
export default harvestSlice.reducer;
