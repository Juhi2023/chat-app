import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchChats } from '../store/Action/action';
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
    

  return (
    <div className='overflow-hidden '>
      <Header/>
      <div className='bg-light rounded d-flex shadow' style={{margin: '58px 0 0 0', height: 'calc(100vh - 60px)'}}>
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
  };
};
export default(
  connect(mapStateToProps, {fetchChats})(ChatPage)
);


