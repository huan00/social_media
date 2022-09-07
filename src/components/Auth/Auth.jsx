import {
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  Grid,
  Container,
  InputAdornment
} from '@mui/material'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../actions/auth'
import jwt_decode from 'jwt-decode'
import { login } from '../../features/auth/authSlice'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [inputData, setInputData] = useState(initialState)

  const switchMode = () => {
    setIsSignup((prev) => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isSignup) {
      dispatch(signIn(inputData, navigate))
    } else {
      dispatch(signUp(inputData, navigate))
    }
  }

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const googleSuccess = async (res) => {
    const data = jwt_decode(res.credential)
    const token = res.credential

    try {
      dispatch(login({ data, token }))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error)
    console.log("'google sign in fail, try again later")
  }

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={5} sx={{ height: 'fit-content' }}>
        <FaUserCircle fontSize={36} color="red" style={{ paddingTop: 20 }} />
        <Typography variant="h6">{isSignup ? 'Sign In' : 'Sign Up'}</Typography>
        <form style={{ padding: 10 }} onSubmit={handleSubmit}>
          <Grid container>
            {isSignup && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '12px 0'
                }}
              >
                <TextField
                  name="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                />
              </div>
            )}
            <TextField
              type="email"
              variant="outlined"
              label="Email Address"
              name="email"
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              label="Password"
              name="password"
              fullWidth
              required
              sx={{ my: 2 }}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword}>
                      {!showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {isSignup && (
              <TextField
                type="password"
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
            )}
          </Grid>
          <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
            {!isSignup ? 'Sign In' : 'Sign Up'}
          </Button>

          <GoogleLogin
            onSuccess={(res) => googleSuccess(res)}
            onError={(res) => googleFailure(res)}
          />
          <Grid container justifyContent={'flex-end'}>
            <Grid item xs={10}>
              <Button onClick={switchMode}>
                {!isSignup
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
