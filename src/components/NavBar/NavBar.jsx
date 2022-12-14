import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { AppBar, Avatar, Box, Button, Typography } from '@mui/material'
import logo from '../../images/hz_logo.png'

import { styles } from './styles'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { removeProfile } from '../../features/auth/authSlice'
import { filterMyPosts } from '../../features/post/postSlice'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )

  useEffect(() => {
    const token = profile?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setProfile(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const logout = () => {
    dispatch(removeProfile())
    navigate('/')
    setProfile(null)
  }

  const handleClickAvatar = () => {
    if (profile.data.sub) {
      dispatch(filterMyPosts(profile.data.sub))
    } else dispatch(filterMyPosts(profile.data._id))
  }

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <Box sx={styles.brandContainer} component={Link} to="/">
        <Typography
          color="error"
          sx={{ typography: { xs: 'caption', md: 'h6', lg: 'h4' } }}
          variant="h4"
        >
          Hz Media
        </Typography>
        <img src={logo} alt="logo" style={{ width: '50px' }} />
      </Box>
      <Box sx={styles.loginStatus}>
        {profile ? (
          <div
            style={{
              width: '250px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '130px'
              }}
            >
              <Avatar
                alt={profile?.name ? profile?.name : profile?.data?.firstName}
                src={profile?.data?.picture}
                onClick={handleClickAvatar}
                sx={{ cursor: 'pointer' }}
              >
                {profile?.data?.firstName?.charAt(0)}
              </Avatar>
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={handleClickAvatar}
              >
                {profile?.data?.name
                  ? profile?.data?.name
                  : `${profile?.data?.firstName} ${profile?.data?.lastName}`}
              </Typography>
            </div>
            <Button
              component={Link}
              to="/"
              variant="contained"
              onClick={logout}
              color="error"
            >
              LOGOUT
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SIGNIN
          </Button>
        )}
      </Box>
    </AppBar>
  )
}

export default NavBar
