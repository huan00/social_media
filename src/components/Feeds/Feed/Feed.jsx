import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  MenuItem,
  Menu
} from '@mui/material'
import { red } from '@mui/material/colors'
import { BiDotsVertical } from 'react-icons/bi'
import { AiOutlineHeart, AiFillHeart, AiOutlineEdit } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import moment from 'moment'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likePost, deletePost } from '../../../actions/post'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Feed = ({ post, handleUpdate }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile'))
  )
  const profileId = profile?.data.sub || profile?.data._id
  const [likes, setLikes] = useState(post?.likes)
  const likedPost = likes.find((like) => like === profileId)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('profile')))
  }, [location])

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
    if (!profile) {
      return
    }
    dispatch(likePost(post._id))
    if (likedPost) {
      setLikes(likes.filter((id) => id !== profileId))
    } else {
      setLikes([...likes, profileId])
    }
  }

  const openMenu = (e) => {
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(e.currentTarget)
    }
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id))
  }

  const handleDisable = () => {
    if (
      post.creator === profile?.data?.sub ||
      post.creator === profile?.data?._id
    ) {
      return false
    } else return true
  }

  return (
    <Card sx={{ width: 300, height: 'fit-content', m: 1 }} raised elevation={6}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
            {post?.name?.split(' ')[0]?.charAt(0)}
            {post?.name?.split(' ')[1]?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton
            color="secondary"
            aria-label="setting"
            onClick={openMenu}
            disabled={profile ? handleDisable() : true}
          >
            <BiDotsVertical />
            <Menu
              id="update-delete"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleUpdate(post._id)}>
                <AiOutlineEdit />
                Update
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <BiTrash />
                Delete
              </MenuItem>
            </Menu>
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
          sx={{ objectFit: 'contain', backgroundColor: '#ccc' }}
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
        <Typography height={20} variant="body2">
          {post.message}
        </Typography>
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
