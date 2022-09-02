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
    }
  }
})

export const { newPost, getPosts } = postSlice.actions

export default postSlice.reducer
