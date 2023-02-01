import { Button, Box, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost, getSearchedPosts } from '../../actions/post'
import { useNavigate } from 'react-router-dom'
import { MuiChipsInput } from 'mui-chips-input'

const CreateForm = ({ profile, formInput, setFormInput, handleClear }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formInput._id) {
      dispatch(updatePost(formInput))
    } else {
      dispatch(
        createPost(
          {
            ...formInput,
            name: `${
              profile?.data._id
                ? `${profile?.data?.firstName} ${profile?.data?.lastName}`
                : `${profile?.data.name}`
            }`
          },
          navigate
        )
      )
    }
    setFormInput({ title: '', message: '', tags: '', selectedFile: '' })
  }

  return (
    <Box>
      <Paper sx={{ mt: 5, width: 350, height: 'fit-content' }} elevation={6}>
        <div>
          <Typography fontSize={20} sx={{ pt: 2 }}>
            {formInput._id ? 'Update Post' : 'Create a Post'}
          </Typography>
        </div>
        <form
          autoComplete="off"
          style={{
            padding: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={formInput?.title}
            onChange={handleInput}
          />
          <TextField
            name="message"
            style={{ margin: '8px 0' }}
            variant="outlined"
            label="Message"
            fullWidth
            value={formInput.message}
            onChange={handleInput}
          />
          <MuiChipsInput
            label="Tags"
            value={formInput.tags}
            onAddChip={(tag) =>
              setFormInput({ ...formInput, tags: [...formInput.tags, tag] })
            }
            onDeleteChip={(deleteTag) =>
              setFormInput({
                ...formInput,
                tags: formInput.tags.filter((tag) => tag !== deleteTag)
              })
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
            {formInput._id ? 'UPDATE' : 'SUBMIT'}
          </Button>
          <Button
            color="error"
            variant="contained"
            fullWidth
            onClick={handleClear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateForm
