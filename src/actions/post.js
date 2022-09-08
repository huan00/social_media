import * as api from '../api'
import {
  newPost,
  getPosts,
  getAPost,
  like,
  deleteAPost,
  updateAPost,
  searchedPosts,
  postComment
} from '../features/post/postSlice'

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

export const fetchAPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAPost(id)
    console.log(data)
    dispatch(getAPost(data))
    return data
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch(like(data))
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id)
    dispatch(deleteAPost(id))
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(post)
    dispatch(updateAPost(data))
  } catch (error) {
    console.log(error)
  }
}

export const getSearchedPosts = (search) => async (dispatch) => {
  try {
    const { data } = await api.getSearchedPosts(search)
    dispatch(searchedPosts(data))
  } catch (error) {
    console.log(error)
  }
}

export const submitComment = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.submitComment(comment, id)
    dispatch(postComment(data))
    return data.comments
  } catch (error) {
    console.log(error)
  }
}
