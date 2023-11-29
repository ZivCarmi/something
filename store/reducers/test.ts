import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TestState {
  total: number;
}

const initialState: TestState = {
  total: 0,
};

const testReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    addToTotal: (state, action: PayloadAction<number>) => {
      state.total += action.payload;
    },
  },
});

export const { addToTotal } = testReducer.actions;

export default testReducer.reducer;
