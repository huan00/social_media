import React from 'react'
import { AppBar, Box, Button, Typography } from '@mui/material'
import logo from '../../images/hz_logo.png'

import { styles } from './styles'

const NavBar = () => {
  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <Box sx={styles.brandContainer}>
        <Typography variant="h4">Hz Media</Typography>
        <img src={logo} alt="logo" style={{ width: '50px' }} />
      </Box>
      <Box sx={styles.loginStatus}>
        <Button variant="contained" color="primary">
          SIGNIN
        </Button>
      </Box>
    </AppBar>
  )
}

export default NavBar
