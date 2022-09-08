import { Paper, Typography } from '@mui/material'
import React from 'react'
import Comments from './Comment'
import { AiOutlineHeart, AiFillHeart, AiOutlineEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

const FeedDetail = () => {
  const { id } = useParams()
  const post = useSelector((state) =>
    state.post.posts.filter((post) => post._id === id)
  )

  console.log(post)

  return (
    <div style={{ marginTop: '10px' }}>
      <Paper sx={{ p: 2 }} elevation={6}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 'fit-content' }}>
            <Typography sx={{ textAlign: 'left' }} variant="h5">
              Title: {post[0].title}
            </Typography>
            <hr style={{ border: '1px solid #ccc' }} />
            <div style={{ minHeight: '100px' }}>
              <Typography sx={{ textAlign: 'left' }} variant="body1">
                Message:
              </Typography>
              <Typography sx={{ textAlign: 'left' }} variant="body2">
                {post[0].message}
              </Typography>
            </div>
            <hr style={{ border: '1px solid #ccc' }} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '400px',
                height: '400px',
                margin: '10px 0',
                borderRadius: '10px',
                backgroundColor: '#ccc'
              }}
            >
              <img src={post[0].selectedFile} alt={post[0].title} />
            </div>
            <div>
              <Typography sx={{ textAlign: 'left' }} variant="subtitle1">
                Created by: {post[0].name} {moment(post[0].createdAt).fromNow()}
              </Typography>
              <Typography sx={{}} variant="subtitle1"></Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {post[0].likes.length > 0 ? (
                  <>
                    <AiFillHeart /> &nbsp;
                    {post[0]?.likes.length}
                  </>
                ) : (
                  <>
                    <AiOutlineHeart /> 0
                  </>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap-reverse' }}>
                {post[0].tags.map((tag) => (
                  <Typography variant="body1">#{tag} &nbsp;</Typography>
                ))}
              </div>
            </div>
          </div>
          <Comments />
        </div>
      </Paper>
    </div>
  )
}

export default FeedDetail
