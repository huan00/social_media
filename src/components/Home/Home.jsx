import { Container, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchPost } from '../../actions/post'

import Feeds from '../Feeds/Feeds'
import CreateForm from '../Form/CreateForm'
import Form from '../Form/Form'

const Home = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post)
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )
  const [formInput, setFormInput] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  })

  useEffect(() => {
    if (location.pathname === '/') dispatch(fetchPost())
  }, [location])

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const handleUpdate = (id) => {
    const updatePost = posts.filter((post) => post._id === id)
    setFormInput(...updatePost)
  }

  const handleClear = () => {
    setFormInput({ title: '', message: '', tags: '', selectedFile: '' })
  }

  return (
    <Container
      sx={{
        // width: window.innerWidth * 0.9,
        mt: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ maxWidth: '60%' }}>
          <Feeds handleUpdate={handleUpdate} />
        </div>
        <div
          style={{
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
            margin: '8px auto'
          }}
        >
          <Form />
          {profile && (
            <CreateForm
              profile={profile}
              handleUpdate={handleUpdate}
              formInput={formInput}
              setFormInput={setFormInput}
              handleClear={handleClear}
            />
          )}
        </div>
      </Paper>
    </Container>
  )
}

export default Home
