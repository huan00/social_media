import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3003'
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const signUp = (data) => API.post(`user/signup`, data)

export const signIn = (data) => API.post(`user/signin`, data)
