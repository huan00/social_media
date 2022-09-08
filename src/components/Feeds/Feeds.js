import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Feed from './Feed/Feed'
import { useLocation } from 'react-router-dom'

const Feeds = ({ handleUpdate }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )

  const { posts } = useSelector((state) => state.post)

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
