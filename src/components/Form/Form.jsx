import { Button, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost, updatePost, getSearchedPosts } from '../../actions/post'
import { useNavigate } from 'react-router-dom'
import { MuiChipsInput } from 'mui-chips-input'

const Form = ({ profile, formInput, setFormInput }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState({
    feed: '',
    tags: []
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.feed.trim() || search.tags.length > 0) {
      const searchData = { ...search, tags: search.tags.join(',') }
      dispatch(getSearchedPosts(searchData))
      navigate(
        `/post/search?searchQuery=${
          search.feed || 'none'
        }&tags=${search.tags.join(',')}`
      )
    } else {
      navigate('/')
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
            onChange={(e) => setSearch({ ...search, feed: e.target.value })}
          />
          {/* <Typography>Search Tags</Typography> */}
          <MuiChipsInput
            value={search.tags}
            variant="outlined"
            label="Search Tags"
            fullWidth
            style={{ margin: '8px 0' }}
            onAddChip={(tag) =>
              setSearch({ ...search, tags: [...search.tags, tag] })
            }
            onDeleteChip={handleDelete}
          />
          <Button type="submit" variant="contained" fullWidth>
            SEARCH
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default Form
