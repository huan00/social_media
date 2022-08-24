import { Container } from '@mui/material'
import React from 'react'
import Auth from '../Auth/Auth'
import Feed from '../Feeds/Feed/Feed'
import Form from '../Form/Form'

const Home = () => {
  return (
    <Container
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <Feed />
      <Form />
      <Auth />
    </Container>
  )
}

export default Home
