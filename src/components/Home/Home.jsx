import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Feeds from '../Feeds/Feeds'
import Form from '../Form/Form'

const Home = () => {
  const { posts } = useSelector((state) => state.post)
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )
  const [formInput, setFormInput] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })

  const handleUpdate = (id) => {
    const updatePost = posts.filter((post) => post._id === id)
    setFormInput(...updatePost)
  }

  return (
    <Container
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <Feeds handleUpdate={handleUpdate} />
      </div>
      <Form
        profile={profile}
        handleUpdate={handleUpdate}
        formInput={formInput}
        setFormInput={setFormInput}
      />
    </Container>
  )
}

export default Home
