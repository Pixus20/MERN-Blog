import {configureStore} from '@reduxjs/toolkit'
import authSlice from './Features/auth/authSlice'


export const store =configureStore({
   reducer:{
      auth:authSlice,
   },
})
