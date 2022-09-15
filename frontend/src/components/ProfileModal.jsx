import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import { Box } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal(props) {

  const {handleClose, open, userInfo} = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                image={userInfo.pic ? userInfo.pic : "http://res.cloudinary.com/photostore/image/upload/v1663055978/w7w5ygflpen94mqkjmrp.png"}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className='text-capitalize' style={{color: '#192A53'}}>
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {userInfo.email}
                </Typography>
              </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={handleClose}>
                Close
              </Button>
            </CardActions>
          </Card>

        </Box>
      </Modal>
    </div>
  );
}
