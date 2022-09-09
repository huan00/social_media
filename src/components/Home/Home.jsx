import { Container } from '@mui/material'
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
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <Feeds handleUpdate={handleUpdate} />
      </div>
      <div>
        <Form
          profile={profile}
          handleUpdate={handleUpdate}
          formInput={formInput}
          setFormInput={setFormInput}
          handleClear={handleClear}
        />
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
    </Container>
  )
}

export default Home
