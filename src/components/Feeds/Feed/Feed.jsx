import React from 'react'
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from '@mui/material'
import { red } from '@mui/material/colors'
import { BiDotsVertical } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import moment from 'moment'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likePost } from '../../../actions/post'

const Feed = ({ post }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.data.sub || user?.data._id
  const [likes, setLikes] = useState(post?.likes)
  const likedPost = likes.find((like) => like === userId)

  const LikeCounts = () => {
    if (likes.length > 0) {
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
        <AiOutlineHeart /> &nbsp; {'0'}
      </>
    )
  }

  const handleLikes = () => {
    dispatch(likePost(post._id))
    if (likedPost) {
      setLikes(likes.filter((id) => id !== userId))
    } else {
      setLikes([...likes, userId])
    }
  }

  return (
    <Card sx={{ width: 300, height: '100%', m: 1 }} raised elevation={6}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
            {post?.name?.split(' ')[0]?.charAt(0)}
            {post?.name?.split(' ')[1]?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton color="secondary" aria-label="setting">
            <BiDotsVertical />
          </IconButton>
        }
        title={post.title}
      />
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="195"
          image={post.selectedFile}
          alt={post.title}
        />
        <Typography
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: 'white',
            padding: 1
          }}
          variant="body2"
        >
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <CardContent>
        <Typography variant="body2">{post.message}</Typography>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 0
        }}
      >
        <CardActions>
          <IconButton aria-label="likes" onClick={handleLikes}>
            <LikeCounts />
          </IconButton>
        </CardActions>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {post?.tags.map((tag) => (
            <Typography variant="subtitle2" sx={{ mx: 1 }} key={Math.random()}>
              {`#${tag}`}
            </Typography>
          ))}
        </Box>
      </CardActions>
    </Card>
  )
}

export default Feed
