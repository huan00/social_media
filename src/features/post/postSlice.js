import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: []
}

export const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    newPost: (state, action) => {
      return { ...state, posts: [...state.posts, action.payload] }
    },
    getPosts: (state, action) => {
      return { ...state, posts: [...action.payload] }
    },
    like: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        )
      }
    },
    deleteAPost: (state, action) => {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      }
    },
    updateAPost: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        )
      }
    }
  }
})

export const { newPost, getPosts, like, deleteAPost, updateAPost } =
  postSlice.actions

export default postSlice.reducer
