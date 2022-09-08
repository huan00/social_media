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
export const getAPost = (id) => API.get(`post/${id}`)
export const getMyPosts = () => API.get('post/myposts')
export const likePost = (id) => API.put(`post/${id}/likepost`)
export const deletePost = (id) => API.delete(`post/${id}/deletepost`)
export const updatePost = (post) => API.put(`post/${post._id}/updatepost`, post)
export const getSearchedPosts = (search) =>
  API.get(
    `/post/search?searchQuery=${search.feed || 'none'}&tags=${search.tags}`
  )
export const submitComment = (comment, id) =>
  API.post(`/post/${id}/comment`, { comment })
