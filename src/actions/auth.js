import * as api from '../api/index'
import { login, signup } from '../features/auth/authSlice'

export const signUp = (inputData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(inputData)
    dispatch(signup({ data }))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const signIn = (inputData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(inputData)
    dispatch(login(data))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}
