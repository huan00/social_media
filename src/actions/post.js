import * as api from '../api'
import { newPost, getPosts } from '../features/post/postSlice'

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    dispatch(newPost(data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchPost = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts()

    dispatch(getPosts(data))
  } catch (error) {
    console.log(error)
  }
}
