import { Paper, Typography } from '@mui/material'
import { useState } from 'react'
import Comments from './Comment'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useEffect } from 'react'
import { fetchPost, likePost } from '../../actions/post'

const FeedDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  let post = useSelector((state) =>
    state?.post?.posts?.filter((post) => post._id === id)
  )
  const profile = JSON.parse(localStorage.getItem('profile'))
  const profileId = profile?.data.sub || profile?.data._id
  const [likes, setLikes] = useState(post[0]?.likes)
  const likedPost = likes?.find((like) => like === profileId)

  useEffect(() => {
    if (post.length === 0) dispatch(fetchPost())
  }, [])

  useEffect(() => {
    setLikes(post[0]?.likes)
  }, [post[0]])

  const LikeCounts = () => {
    if (likes?.length > 0) {
      return likedPost ? (
        <>
          <AiFillHeart /> &nbsp; {likes.length}
        </>
      ) : (
        <>
          <AiOutlineHeart /> &nbsp;{likes.length}
        </>
      )
    }
    return (
      <>
        <AiOutlineHeart /> &nbsp;{'0'}
      </>
    )
  }

  const handleLikes = () => {
    if (!profile) {
      return
    }
    dispatch(likePost(post[0]._id))
    if (likedPost) {
      setLikes(likes.filter((id) => id !== profileId))
    } else {
      setLikes([...likes, profileId])
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Paper sx={{ p: 2 }} elevation={6}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: 'fit-content' }}>
            <Typography sx={{ textAlign: 'left' }} variant="h5">
              Title: {post[0]?.title}
            </Typography>
            <hr style={{ border: '1px solid #ccc' }} />
            <div style={{ minHeight: '100px' }}>
              <Typography sx={{ textAlign: 'left' }} variant="body1">
                Message:
              </Typography>
              <Typography sx={{ textAlign: 'left' }} variant="body2">
                {post[0]?.message}
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
              <img src={post[0]?.selectedFile} alt={post[0]?.title} />
            </div>
            <div>
              <Typography sx={{ textAlign: 'left' }} variant="subtitle1">
                Created by: {post[0]?.name}{' '}
                {moment(post[0]?.createdAt).fromNow()}
              </Typography>
              <Typography sx={{}} variant="subtitle1"></Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {likes && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={handleLikes}
                >
                  {LikeCounts()}
                </div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap-reverse' }}>
                {post[0]?.tags.map((tag, idx) => (
                  <Typography key={idx} variant="body1">
                    #{tag} &nbsp;
                  </Typography>
                ))}
              </div>
            </div>
          </div>
          {post.length > 0 && <Comments post={post} />}
        </div>
      </Paper>
    </div>
  )
}

export default FeedDetail
