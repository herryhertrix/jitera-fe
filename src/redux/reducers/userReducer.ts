import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    username: any;
    id: any;
}

export const userStateDefaultValue: userState = {
    id: "",
    username: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState: userStateDefaultValue,
    reducers: {
        logout(state) {
            state.id = ""
            state.username = ""
        },
        login(state, actions){
            state.id = actions.payload.id
            state.username = actions.payload.username
        }
    }
})

export const { logout, login } = userSlice.actions;
export const selectuser = (state: any): userState => {
    return state.user as userState;
};
export default userSlice.reducer;

