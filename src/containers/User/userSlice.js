import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jwt-decode';
import { addAccount } from '../MoneyTrans/acountSlice';
import { addNotice } from './noticeSlice';

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        token: '',
        data: []
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
           return{
            ...state.initialState
           }
        },
        signup: (state, action) =>{
            return{
                ...state,
                isRegister:true,
                succesMessage: 'You have been signed succesfully'
            }
        },
        profile: (state, action) => {
            return{
                ...state,
                ...action.payload
            }
            
        },
        logError: (state, action) => {
            return {
                ...state,
                isError: !action.payload.success,
                errorMessage: action.payload.message
            }
        }
    }
});

export const loginUser = (body) => async (dispatch) => {
    try {
        const user = await axios.post("http://localhost:3001/users/login", body);
        var decode = jwt(user.data.token);

        if (user.status === 200) {
            dispatch(login({
                ...decode, 
                token: user.data.token
            }))
            const account = await axios.get(`http://localhost:3001/accounts/getallaccounts/${user.data.user.id}`)
            dispatch(addAccount(account.data.data[0]));
            
            const notice = await axios.get(`http://localhost:3001/notices/getnotices/${account.data.data[0]._id}`)
            dispatch(addNotice(notice.data))
            console.log("slice",notice.data)
        }
        

    } catch (error) {
        console.log(error)
    }
};


export const {login ,logout, signup, profile, logError} = userSlice.actions;
export const userData = (state) => state.user;
export default userSlice.reducer;