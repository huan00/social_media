import { useState } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { submitComment } from '../../actions/post'

const Comments = ({ post }) => {
  const dispatch = useDispatch()
  const profile = JSON.parse(localStorage.getItem('profile'))
  const [postComments, setPostComments] = useState(post[0]?.comments)
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    const name = `${
      profile?.data.name
        ? `${profile.data.name}`
        : `${profile.data.firstName} ${profile.data.lastName}`
    }`
    const submitData = name + ': ' + comment
    const result = await dispatch(submitComment(submitData, post[0]._id))
    setPostComments(result)
    setComment('')
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '80%' }}>
        <Typography variant="h5">Comments:</Typography>
        <div style={{ width: '100%', overflow: 'auto' }}>
          {postComments?.map((comment, idx) => (
            <Typography textAlign="left" variant="subtitle2" key={idx}>
              {comment}
            </Typography>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '0', width: '80%' }}>
        <Typography textAlign="left" variant="h6">
          Write a Comment:
        </Typography>
        <div style={{ display: 'flex' }}>
          <TextField
            fullWidth
            rows={1}
            disabled={profile ? false : true}
            label={!profile ? 'Please sign in to Comment' : 'Comment'}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            sx={{ mx: 2 }}
            color="primary"
            variant="contained"
            disabled={!comment ? true : false}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Comments
