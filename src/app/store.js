import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../containers/User/userSlice'
import accountSlice from '../containers/MoneyTrans/acountSlice'
import noticeSlice from '../containers/User/noticeSlice'

export default configureStore({
    reducer: {
        user: userSlice,
        account: accountSlice,
        notice: noticeSlice
    }
})