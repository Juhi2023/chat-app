import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchChats ,getWindowSize} from '../store/Action/action';
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

function ChatPage(props) {
  const {chats} = props;
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.userInfo) {
      navigate("/");
    }else{
      props.fetchChats()
    }
  }, [navigate, props.userInfo]);
    
  useEffect(()=>{
    window.addEventListener('resize', ()=>{props.getWindowSize(window.innerWidth)})
    props.getWindowSize(window.innerWidth)

    return ()=> window.removeEventListener('resize', ()=>{props.getWindowSize(window.innerWidth)});
  },[props.screenSize])


  return (
    <div className='overflow-hidden'>
      <Header/>
      <div className='bg-light rounded d-flex shadow ' style={{margin: '53px 0 0 0', height: 'calc(100vh - 55px)'}}>
        <MyChats/>
        <ChatBox/>
      </div>
    </div>
  )
}


const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo,
    chats: reducer.chats,
    screenSize: reducer.screenSize
  };
};
export default(
  connect(mapStateToProps, {fetchChats,getWindowSize})(ChatPage)
);


