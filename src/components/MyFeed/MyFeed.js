import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Feed from '../Feeds/Feed/Feed'
import Form from '../Form/Form'

const MyFeed = () => {
  const dispatch = useDispatch()
  const profile = JSON.parse(localStorage.getItem('profile'))
  const { posts } = useSelector((state) => state.post)

  useEffect(() => {}, [])

  return (
    <Container
      component="main"
      sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
    >
      <div style={{ display: 'flex' }}>
        {posts.map((feed) => (
          <Feed post={feed} key={feed._id} profile={profile} />
        ))}
      </div>
      <div style={{ marginTop: '8px' }}>
        <Form profile={profile} />
      </div>
    </Container>
  )
}

export default MyFeed
