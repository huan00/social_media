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
    }
  }
})

export const { newPost, getPosts, like } = postSlice.actions

export default postSlice.reducer
