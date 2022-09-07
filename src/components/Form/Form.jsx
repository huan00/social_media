import { Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost, getSearchedPosts } from '../../actions/post'
import { useNavigate } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

const Form = ({ profile, formInput, setFormInput }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState({
    feed: '',
    tags: []
  })

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
            name: `${profile?.data?.firstName} ${profile?.data?.lastName} `
          },
          navigate
        )
      )
    }
    setFormInput({ title: '', message: '', tags: '', selectedFile: '' })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.feed.trim() || search.tags) {
      const searchData = { ...search, tags: search.tags.join(',') }
      dispatch(getSearchedPosts(searchData))
      navigate(
        `/post/search?searchQuery=${
          search.feed || 'none'
        }&tags=${search.tags.join(',')}`
      )
    }
    setSearch({
      feed: '',
      tags: []
    })
  }

  const handleDelete = (deleteTag) => {
    setSearch({
      ...search,
      tags: search.tags.filter((tag) => tag !== deleteTag)
    })
  }

  return (
    <div>
      <Paper elevation={6} sx={{ width: 350, height: 'fit-content' }}>
        <form
          autoComplete="off"
          style={{ padding: 15 }}
          onSubmit={handleSearch}
        >
          {/* <Typography>Search Feed</Typography> */}
          <TextField
            variant="outlined"
            label="Search Feed"
            fullWidth
            value={search.feed}
            sx={{}}
            onChange={(e) => setSearch({ ...search, feed: e.target.value })}
          />
          {/* <Typography>Search Tags</Typography> */}
          <ChipInput
            value={search.tags}
            variant="outlined"
            label="Search Tags"
            fullWidth
            style={{ margin: '8px 0' }}
            onAdd={(tag) =>
              setSearch({ ...search, tags: [...search.tags, tag] })
            }
            onDelete={handleDelete}
          />
          <Button type="submit" variant="contained" fullWidth>
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
