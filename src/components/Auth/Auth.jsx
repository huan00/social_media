import {
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Container,
  Input
} from '@mui/material'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true)

  const switchMode = () => {
    setIsSignup((prev) => !prev)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={5} sx={{ height: 'fit-content' }}>
        <FaUserCircle fontSize={36} color="red" style={{ paddingTop: 20 }} />
        <Typography variant="h6">{isSignup ? 'Sign In' : 'Sign Up'}</Typography>
        <form style={{ padding: 10 }}>
          <Grid spacing={2}>
            {isSignup && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '12px 0'
                }}
              >
                <TextField name="firstName" label="First Name" autoFocus half />
                <TextField name="lastName" label="Last Name" half />
              </div>
            )}
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
            {isSignup && (
              <TextField
                type="password"
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          </Grid>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {}}
            sx={{ mb: 2 }}
          >
            {isSignup ? 'Sign In' : 'Sign Up'}
          </Button>

          <GoogleLogin
            onSuccess={(res) => console.log(res)}
            onError={(res) => console.log(res)}
          />
          <Grid container justifyContent={'flex-end'}>
            <Grid item xs={10}>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
