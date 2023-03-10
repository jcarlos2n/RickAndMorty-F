import { createSlice } from "@reduxjs/toolkit";

export const noticeSlice = createSlice({
    name: 'notice',
    initialState: {
        notice: {}
    },
    reducers: {
        addNotice: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        
        },
        cleanNotice: (state, action) => {
            return{
                ...state.initialState
               }
        }
    }
});

export const {addNotice, cleanNotice} = noticeSlice.actions;
export const noticeData = (state) => state.notice;
export default noticeSlice.reducer;