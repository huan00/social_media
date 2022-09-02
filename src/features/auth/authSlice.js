import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authData: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return { ...state, authData: action?.payload }
    },
    removeProfile: (state) => {
      localStorage.clear()

      return { ...state, authData: null }
    }
  }
})

export const { login, removeProfile } = authSlice.actions

export default authSlice.reducer
