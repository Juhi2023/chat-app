import React, { useEffect, useState } from 'react'
import chat from '../assets/images/chat.jpg'
import {Container, Card} from '@mui/material';
import {Col, Row} from 'react-bootstrap';
import LoginSignup from '../components/Authentication/LoginSignup';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';

function Home(props) {

  const navigate = useNavigate()

  useEffect(() => {
    if (props.userInfo) {
      navigate("/chats");
    }else{
      navigate("/");
    }
  }, [navigate, props.userInfo]);

  return (
    <Container sx={{marginTop: '50px'}}>
      <div className='app-name'>
        <span>Talks</span>
        <span>Up</span>
      </div>
      <Row>
        <Col lg={7}>
          <Card sx={{margin:'20px 0'}}>
            <LoginSignup/>
          </Card>
        </Col>

        <Col lg={5} className='home-logo'>
          <img className='home-logo' src={chat} alt="" style={{width: '100%', margin: 'auto'}}/>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo,
  };
};
export default(
  connect(mapStateToProps)(Home)
);
