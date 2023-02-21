import { createSlice } from "@reduxjs/toolkit";

export interface balanceState {
    balance: number;
}

export const balanceStateDefaultValue: balanceState = {
    balance: 0,
}

const balanceSlice = createSlice({
    name: 'balance',
    initialState: balanceStateDefaultValue,
    reducers: {
        getbalance(state, actions){
            state.balance = actions.payload
        }
    }
})

export const { getbalance } = balanceSlice.actions;
export const selectbalance = (state: any): balanceState => {
    return state.balance as balanceState;
};
export default balanceSlice.reducer;

