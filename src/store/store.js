import { configureStore } from '@reduxjs/toolkit';
import fungiReducer from './fungi.store';
import scriptReducer from './script.store';
import diseaseReducer from './disease.store';
import harvestReducer from './harvest.store';

const store = configureStore({
  reducer: {
    fungi: fungiReducer,
    script: scriptReducer,
    disease: diseaseReducer,
    harvest: harvestReducer,
  },
});

export default store;
