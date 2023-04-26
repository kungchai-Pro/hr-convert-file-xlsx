import { configureStore } from '@reduxjs/toolkit'
import leaveReducer from'../reduxSlice/LeaveSlice';

export const store = configureStore({
    reducer: {
        leaves: leaveReducer,
      },
})