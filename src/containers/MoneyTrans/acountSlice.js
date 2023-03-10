import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: {}
    },
    reducers: {
        addAccount: (state, action) => {
            return {
                account: {},
                ...state,
                ...action.payload
            }
        
        },
        cleanAccount: (state, action) => {
            return{
                ...state,
                account: {}
            }
        }
    }
});

export const {addAccount, cleanAccount} = accountSlice.actions;
export const accountData = (state) => state.account;
export default accountSlice.reducer;