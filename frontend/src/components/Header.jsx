import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import chatlogo from '../assets/images/chat-logo.png'
import {Avatar, Button, Menu, MenuItem, Stack, Tooltip} from '@mui/material';
import SideSearchBar from './SideSearchBar';
import { logOut } from '../store/Action/action';
import { connect } from 'react-redux';
import ProfileModal from './ProfileModal';

function Header(props) {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  // menu
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //modal
  const [modalOpen, setOpen] = React.useState(false);
  const handleModalOpen = () => {setOpen(true);}
  const handleModalClose = () => setOpen(false);

  return (
    <div className="bg-light position-fixed w-100 shadow-sm" style={{top:0, zIndex:9999999}}>
      <div className='mx-md-5 mx-3'>
      <div className='d-flex justify-content-between py-2 align-items-center'>
        <div className='fw-bolder fs-4'>
          <img src={chatlogo} alt="" style={{width: '40px'}} className="me-2"/>
          <span style={{color: '#FF4F5A'}}>Talks</span>
          <span style={{color: '#FFB753'}}>Up</span>
        </div>
        <Stack direction="row" spacing={1} className="align-items-center">
          <div>
            <Tooltip title="Notification">
              <Button size="small" style={{ minWidth:'fit-content', color: 'gray'}}><NotificationsIcon/></Button>
            </Tooltip>
          </div>
          
          <SideSearchBar/>

          <div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{ minWidth:'fit-content'}}
            >
              <Avatar
                alt=""
                src={props.userInfo.pic}
                sx={{ width: 26, height: 26 }}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleModalOpen}>Profile</MenuItem>
              <ProfileModal handleClose={handleModalClose} open={modalOpen} userInfo={props.userInfo}/>
              <MenuItem onClick={props.logOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Stack>
      </div>
    </div>
    </div>
  )
}

const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo
  };
};
export default(
  connect(mapStateToProps, {logOut})(Header)
);
