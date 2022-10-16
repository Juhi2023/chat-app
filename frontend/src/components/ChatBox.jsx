import { Avatar, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import SendIcon from '@mui/icons-material/Send';
import GroupModal from './GroupModal';
import { connect } from 'react-redux';
import ProfileModal from './ProfileModal';
import { sendMessage, getAllMessages, setMessages} from '../store/Action/action';
import { isLatestMessage, isSameSender } from '../config/ChatLogic';
import { useEffect } from 'react';
import io from "socket.io-client";
import { useState } from 'react';
import typingGif from '../assets/typing.gif'

const ENDPOINT ="https://talks-up.herokuapp.com/";
var socket, selectedChatCompare;

function ChatBox(props) {
  //modal
  const [modalOpen, setOpen] = useState(false);
  const handleModalOpen = () => {setOpen(true);}
  const handleModalClose = () => setOpen(false);
  
  const [message, setMessage] = useState('');
  const[socketConnection, setSocketConnection] = useState(false)
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const typingHandler = (e)=>{
    setMessage(e.target.value);

    if(!socketConnection) return;

    if(!typing){
      setTyping(true);
      socket.emit("typing", props.accessedChat._id)
    }

    let lastTypingTime = new Date().getTime();
    var timeLength = 2000;

    setTimeout(()=>{
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if(timeDiff>= timeLength && typing){
        socket.emit("stop typing", props.accessedChat._id);
        setTyping(false);
      }
    }, timeLength)
  }

  const sendMessage = ()=>{
    if(message){
      setMessage("");
      props.sendMessage(message, props.accessedChat._id, socket)
      socket.emit("stop typing", props.accessedChat._id);
        setTyping(false);
    }
  }

  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit("setup", props.userInfo)
    socket.on('connected', ()=>{
      setSocketConnection(true);
    })
    socket.on("typing", ()=>setIsTyping(true));
    socket.on("stop typing", ()=>setIsTyping(false));
  },[])

  useEffect(()=>{
    if(props.accessedChat){
      props.getAllMessages(props.accessedChat._id);
      socket.emit("join chat", props.accessedChat._id);
    }
    selectedChatCompare = props.accessedChat;
  },[props.accessedChat])

  useEffect(() => {
    console.log('hii')
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        console.log(newMessageRecieved)
        props.setMessages(newMessageRecieved)
      }
    });

    return(()=>{
      socket.off("message recieved")
    })
  });

  return (
    <div className='h-100 w-75 shadow-sm' style={{backgroundColor: '#e0dfdf'}}>
    {
        props.accessedChat ? 
        <>
          <div className='bg-light d-flex justify-content-between fw-bold'>
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

          <div style={{height: 'calc(100% - 155px)', overflowY: 'scroll', overflowX: 'hidden'}}>
            <div className='m-3'>
            {
              props.allMessages &&
              props.allMessages.map((m, i)=>{
                return (
                  <div className='mt-2 d-flex' style={{justifyContent: m.sender._id=== props.userInfo._id ? 'right': 'left'}} key={i}>
                    {
                      (isSameSender(props.allMessages, m, i, props.userInfo._id) || isLatestMessage(props.allMessages, i, props.userInfo._id)) &&
                      <div>
                        <Tooltip title={m.sender.name}>
                          <Avatar
                            alt=""
                            src={m.sender.pic ? m.sender.pic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
                            sx={{ width: 35, height: 35, mr:2, p:0.2, backgroundColor: 'white'}}
                        />
                        </Tooltip>
                      </div>
                    }
                    <span className='p-2  rounded-1' style={{backgroundColor: m.sender._id=== props.userInfo._id ? '#FF4F5A': '#FFB753',
                      color: m.sender._id=== props.userInfo._id ? 'white': 'black',
                      marginLeft:(isSameSender(props.allMessages, m, i, props.userInfo._id) || isLatestMessage(props.allMessages, i, props.userInfo._id)) ? '0px': '50px'}}>
                      {m.content}
                    </span>
                  </div>
                )
              })
            }

            </div>
          </div>
          <div style={{height: '25px'}}>
            {isTyping && <><img className='ms-2' style={{height: '25px', width: '25px'}} src={typingGif} alt="" /></>}
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
    accessedChat: reducer.accessedChat,
    allMessages: reducer.allMessages
  };
};
export default(
  connect(mapStateToProps, {sendMessage, getAllMessages, setMessages})(ChatBox)
);