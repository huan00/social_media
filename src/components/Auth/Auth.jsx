import { ThemeContext } from '@emotion/react'
import { Paper, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Auth = () => {
  return (
    <Paper elevation={5}>
      <FaUserCircle fontSize={36} color="red" style={{ paddingTop: 20 }} />
      <Typography variant="h6">Sign In</Typography>
      <form style={{ padding: 10 }}>
        <TextField
          type="email"
          variant="outlined"
          label="Email Address"
          name="email"
          fullWidth
          required
        />
        <TextField
          type="password"
          variant="outlined"
          label="Password"
          name="password"
          fullWidth
          required
          sx={{ my: 2 }}
        />
        <Button variant="contained" fullWidth>
          SIGN IN
        </Button>
      </form>
    </Paper>
  )
}

export default Auth
