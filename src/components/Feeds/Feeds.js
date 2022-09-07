import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../../actions/post'
import Feed from './Feed/Feed'

const Feeds = ({ handleUpdate }) => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(fetchPost())
  }, [])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {posts &&
        posts.map((post) => (
          <Feed post={post} key={post._id} handleUpdate={handleUpdate} />
        ))}
    </div>
  )
}

export default Feeds
