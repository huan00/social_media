import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Feeds from '../Feeds/Feeds'
import Form from '../Form/Form'

const Home = () => {
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )

  return (
    <Container
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <Feeds />
      <Form profile={profile} />
    </Container>
  )
}

export default Home
