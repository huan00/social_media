import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index'
import { login } from '../features/auth/authSlice'

export const signUp = (inputData, history) => async (dispatch) => {
  try {
    console.log(inputData)
    const { data } = await api.signUp(inputData)
    dispatch({ type: AUTH, data })
  } catch (error) {
    console.log(error)
  }
}

export const signIn = (inputData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(inputData)
    dispatch(login(data))
    navigate('/')
  } catch (error) {}
}
