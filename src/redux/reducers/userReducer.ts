import { createSlice } from "@reduxjs/toolkit";

export interface userState {
    userName: string;
    deposit: string;
}

export const userStateDefaultValue: userState = {
    userName: "",
    deposit: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState: userStateDefaultValue,
    reducers: {
        logout(state) {
            state.userName = ""
            state.deposit = ""
        }
    }
})

export const { logout } = userSlice.actions;
export const selectuser = (state: any): userState => {
    return state.user as userState;
};
export const selectUserToken = (state: any): string => {
    return state.user.token;
};
export default userSlice.reducer;

