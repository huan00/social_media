import { Button, Paper, TextField } from '@mui/material'
import React from 'react'

const Form = () => {
  return (
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
  )
}

export default Form
