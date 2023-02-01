import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Feed from './Feed/Feed'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'

const Feeds = ({ handleUpdate }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )

  const { posts } = useSelector((state) => state.post)

  return (
    <Box
      sx={{
        display: 'flex',
        width: { xs: window.innerWidth, md: 600, lg: 800 },
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
      }}
    >
      {posts &&
        posts.map((post) => (
          <Feed post={post} key={post._id} handleUpdate={handleUpdate} />
        ))}
    </Box>
  )
}

export default Feeds
