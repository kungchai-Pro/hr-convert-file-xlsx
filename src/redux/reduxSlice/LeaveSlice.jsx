import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const LeaveSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {
    addExcel: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.push(action.payload)
    },
    removeExcel: (state) => {
      state.value -= 1
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { addExcel, removeExcel } = LeaveSlice.actions
export const SelectExcel=(state)=>state.leaves.value;
export default LeaveSlice.reducer