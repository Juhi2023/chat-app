import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { connect } from 'react-redux';
import { selectChat } from '../store/Action/action';
import { Avatar, Box, Button, Stack, Tooltip } from '@mui/material';
import { getSender } from '../config/ChatLogic';
import GroupModal from './GroupModal';


function MyChats(props) {

  //modal
  const [modalOpen, setOpen] = React.useState(false);
  const handleModalOpen = () => {setOpen(true);}
  const handleModalClose = () => setOpen(false);
  
  useEffect(()=>{},[props.myChats])


  return (
    <div className='h-100 rounded shadow-sm' style={{border: '1px solid rgb(179 185 201)', borderRight: 0, width:'40%'}}>
      <div className='d-flex justify-content-between m-3'>
        <div style={{color: '#192A53', fontWeight: 700}}>My Chats</div>
        <div>
          <Tooltip title="Create Group">
            <Button
                  id="basic-button"
                  style={{ minWidth:'fit-content'}}
                  onClick={handleModalOpen}
                >
                  <AddCircleOutlineIcon/>
              </Button>
          </Tooltip>
            <GroupModal handleClose={handleModalClose} open={modalOpen} userInfo={props.userInfo}/>
        </div>
      </div>
      <Stack spacing={1} sx={{alignItems: 'center', mt:2, height: 'calc(100% - 100px)'}} className="overflowY-scroll" >
               {
                props.myChats && props.myChats.map((elem, index)=>{
                        return (
                            <Box className='rounded-1 p-2 d-flex align-items-center sidebar-item ' style={{width:'90%', backgroundColor:'rgb(28 32 104 / 5%)'}} key={index} onClick={()=>{props.selectChat(elem)}}>
                                <Avatar
                                    alt=""
                                    src={!elem.isGroupChat ? getSender(props.userInfo, elem.users).pic : ""}
                                    sx={{ width: 35, height: 35, mr:2}}
                                />
                                <div>
                                    <div className='fw-normal text-capitalize name' style={{color:'#192A53'}}>
                                    {!elem.isGroupChat ? getSender(props.userInfo, elem.users).name : elem.chatName}
                                    </div>
                                    <div className='text-lowercase  email' style={{color:'gray', fontSize:'12px'}}>{elem.latestMessage}</div>
                                </div>
                            </Box>
                        )
                    })
                }
            </Stack> 
    </div>
  )
}

const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo,
    myChats: reducer.myChats,
  };
};
export default(
  connect(mapStateToProps, {selectChat})(MyChats)
);
