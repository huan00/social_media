import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3003'
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const signUp = (data) => API.post(`user/signup`, data)
export const signIn = (data) => API.post(`user/signin`, data)

export const createPost = (post) => API.post('post/', post)
export const getPosts = () => API.get('post/')
export const likePost = (id) => API.put(`post/${id}/likepost`)
export const deletePost = (id) => API.delete(`post/${id}/deletepost`)
