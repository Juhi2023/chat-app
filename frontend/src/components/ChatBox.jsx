import { IconButton } from '@mui/material'
import React from 'react'
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import SendIcon from '@mui/icons-material/Send';
import GroupModal from './GroupModal';
import { connect } from 'react-redux';
import ProfileModal from './ProfileModal';
import { sendMessage } from '../store/Action/action';


function ChatBox(props) {
  //modal
  const [modalOpen, setOpen] = React.useState(false);
  const handleModalOpen = () => {setOpen(true);}
  const handleModalClose = () => setOpen(false);
  
  const [message, setMessage] = React.useState('');

  const typingHandler = (e)=>{
    setMessage(e.target.value);
  }

  const sendMessage = (e)=>{
    if(message){
      props.sendMessage(message, props.accessedChat._id)
    }
  }

  return (
    <div className='h-100 w-75 shadow-sm' style={{backgroundColor: '#e0dfdf'}}>
    {
        props.accessedChat ? 
        <>
          <div className='bg-light d-flex justify-content-between align-items-center fw-bold'>
            <div className='mx-5' style={{color: '#FF4F5A', textTransform: 'capitalize', fontSize: '20px'}}>
              {
                props.accessedChat.isGroupChat ?
                props.accessedChat.chatName:
                props.accessedChat.users[1].name
              }
            </div>

            {
              props.accessedChat.isGroupChat ?
              <GroupModal handleClose={handleModalClose} open={modalOpen}/>
              :
              <ProfileModal handleClose={handleModalClose} open={modalOpen} userInfo={props.accessedChat.users[1]}/>
            }

            <IconButton aria-label="delete" size="large" className='m-2' onClick={handleModalOpen}>
              <ViewCompactIcon />
            </IconButton>
          </div>

          <div style={{height: 'calc(100% - 135px'}}>
jj
          </div>

          <div className='shadow-sm bg-white d-flex  justify-content-between align-items-center'>
            <input type="text" className='p-4 w-100' style={{border: 'none', 'outline': 'none'}} placeholder='Write Message...' 
              value={message} 
              onChange={typingHandler}
            />
            <div className='px-4' style={{cursor: 'pointer'}} onClick={sendMessage}>
              <SendIcon/>
            </div>
          </div>
        </>
        :
        <>
          <div className='w-100 h-100 d-flex justify-content-center align-items-center fw-bold' style={{color: '#192A53', fontSize: '20px'}}>
            Start Chatting ...
          </div>
        </>
      }
    </div>
  )
}


const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo,
    accessedChat: reducer.accessedChat
  };
};
export default(
  connect(mapStateToProps, {sendMessage})(ChatBox)
);