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
import { AiOutlineHeart } from 'react-icons/ai'
import { Box } from '@mui/system'

const Feed = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
            Hz
          </Avatar>
        }
        action={
          <IconButton color="secondary" aria-label="setting">
            <BiDotsVertical />
          </IconButton>
        }
        title="My feed status"
        subheader="hungry"
      />
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="195"
          image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg"
          alt="pancakes"
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
          time
        </Typography>
      </div>
      <CardContent>
        <Typography variant="body2">
          That is one good looking stack of pancakes
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid blue',
          p: 0
          // '& .ChildSelector .NestedChildSelector': { paddingBottom: 0 }
        }}
      >
        <CardActions>
          <IconButton aria-label="likes">
            <AiOutlineHeart />
            <Typography variant="body1" sx={{ ml: 1 }}>
              0
            </Typography>
          </IconButton>
        </CardActions>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Typography variant="subtitle2" sx={{ mx: 1 }}>
            #tags
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Feed
