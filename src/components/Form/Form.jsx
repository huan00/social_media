import { Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/post'
import { useNavigate } from 'react-router-dom'

const Form = ({ profile }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formInput, setFormInput] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })

  const handleInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createPost(
        {
          ...formInput,
          name: `${profile?.data?.firstName} ${profile?.data?.lastName} `
        },
        navigate
      )
    )
    setFormInput({ title: '', message: '', tags: '', selectedFile: '' })
  }

  return (
    <div>
      <Paper elevation={6} sx={{ width: 350, height: 'fit-content' }}>
        <form autoComplete="off" style={{ padding: 15 }}>
          {/* <Typography>Search Feed</Typography> */}
          <TextField
            name=""
            variant="outlined"
            label="Search Feed"
            fullWidth
            sx={{}}
          />
          {/* <Typography>Search Tags</Typography> */}
          <TextField
            name=""
            variant="outlined"
            label="Search Tags"
            fullWidth
            sx={{ my: 1 }}
          />
          <Button variant="contained" fullWidth>
            SEARCH
          </Button>
        </form>
      </Paper>

      {profile && (
        <Paper sx={{ mt: 5, width: 350, height: 'fit-content' }} elevation={6}>
          <Typography fontSize={20} sx={{ pt: 2 }}>
            Create a Post
          </Typography>
          <form
            autoComplete="off"
            style={{ padding: 15 }}
            onSubmit={handleSubmit}
          >
            <TextField
              name="title"
              variant="outlined"
              label="title"
              fullWidth
              value={formInput.title}
              onChange={handleInput}
            />
            <TextField
              name="message"
              sx={{ my: 1 }}
              variant="outlined"
              label="message"
              fullWidth
              value={formInput.message}
              onChange={handleInput}
            />
            <TextField
              name="tags"
              variant="outlined"
              label="tags"
              fullWidth
              value={formInput.tags}
              onChange={(e) =>
                setFormInput({ ...formInput, tags: e.target.value.split(',') })
              }
            />
            <div
              style={{
                display: 'flex',
                width: '100%',
                marginTop: '10px',
                alignItems: 'flex-start'
              }}
            >
              <FileBase
                // name="selectedFile"
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setFormInput({ ...formInput, selectedFile: base64 })
                }}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
            >
              SUBMIT
            </Button>
            <Button color="error" variant="contained" fullWidth>
              Clear
            </Button>
          </form>
        </Paper>
      )}
    </div>
  )
}

export default Form
