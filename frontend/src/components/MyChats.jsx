import React, { useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { connect } from 'react-redux';
import { selectChat } from '../store/Action/action';
import { Avatar, Box, Button, Tooltip } from '@mui/material';
import { getSender } from '../config/ChatLogic';
import AddGroupModal from './AddGroupModal';


function MyChats(props) {

  //modal
  const [modalOpen, setOpen] = React.useState(false);
  const handleModalOpen = () => {setOpen(true);}
  const handleModalClose = () => setOpen(false);
  
  useEffect(()=>{},[props.myChats])


  return (
    <div className='h-100 rounded shadow-sm' style={{borderRight: 0, width:(props.screenSize<768)?"100%":"30%", display:(props.screenSize<768)? (props.accessedChat && props.accessedChat !== undefined ? "none": "block"):"block"}}>
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
            <AddGroupModal handleClose={handleModalClose} open={modalOpen} userInfo={props.userInfo}/>
        </div>
      </div>
      <div style={{alignItems: 'center', height: 'calc(100% - 60px)'}} className="p-0 overflow-scroll">
               {
                props.myChats && props.myChats.map((elem, index)=>{
                        return (
                            <Box className='px-2 sidebar-item' key={index} onClick={()=>{props.selectChat(elem)}}>
                                <div className='p-2 pt-3 d-flex align-items-center' style={{borderBottom:'1px solid #E0DFDF'}}>
                                  <Avatar
                                      alt=""
                                      src={!elem.isGroupChat ? getSender(props.userInfo, elem.users).pic : ""}
                                      sx={{ width: 35, height: 35, mr:2}}
                                  />
                                  <div>
                                      <div className='fw-bold text-capitalize name' style={{color:'#192A53'}}>
                                      {!elem.isGroupChat ? getSender(props.userInfo, elem.users).name : elem.chatName}
                                      </div>
                                      <div className='text-lowercase  email' style={{color:'gray', fontSize:'12px'}}>
                                        {elem.latestMessage && elem.latestMessage!== undefined? elem.latestMessage.content.slice(0, 24): ""} 
                                        {elem.latestMessage && elem.latestMessage!== undefined && elem.latestMessage.content.length>23 && <> . . . </>}
                                      </div>
                                  </div>
                                </div>
                            </Box>
                        )
                    })
                }
            </div> 
    </div>
  )
}

const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo,
    myChats: reducer.myChats,
    screenSize: reducer.screenSize,
    accessedChat: reducer.accessedChat,
  };
};
export default(
  connect(mapStateToProps, {selectChat})(MyChats)
);
