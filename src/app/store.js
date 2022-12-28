import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../containers/User/userSlice'
import accountSlice from '../containers/MoneyTrans/acountSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        account: accountSlice
    }
})