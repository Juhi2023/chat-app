import * as actionTypes from '../constants';
import { toast } from 'react-toastify';
import axios from 'axios'

export const signupUser = (name, email, password, pic)=> async(dispatch)=>{
  try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        '/api/user/signup',
        {
          name,
          email,
          password,
          pic,
        },
        config
      )
      
      if(data){
        toast.success("Registered Successfully.");
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
          type: actionTypes.SET_LOGIN_USER,
          payload: data,
        });
      }
      
    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}


export const loginUser = (email, password)=> async(dispatch)=>{
  try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        {
          email,
          password,
        },
        config
      )
      
      if(data){
        toast.success("Logged in Successfully.");
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({
          type: actionTypes.SET_LOGIN_USER,
          payload: data,
        });
      }
      
    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const searchUser = (search)=> async(dispatch)=>{
  try {

    dispatch({
      type: actionTypes.SEARCHED_USER,
      payload: null,
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/user?search=${search}`,
      config
    )
    
    if(data){
      dispatch({
        type: actionTypes.SEARCHED_USER,
        payload: data,
      });
    }
      
    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const getUsers = (query)=> async(dispatch)=>{
  try {

    dispatch({
      type: actionTypes.GET_USERS,
      payload: null,
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/user?search=${query}`,
      config
    )
    
    if(data){
      dispatch({
        type: actionTypes.GET_USERS,
        payload: data,
      });
    }
      
    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const logOut = ()=> (dispatch)=>{
  localStorage.removeItem("userInfo");
  toast.success("Logged out Successfully.");
  dispatch({
    type: actionTypes.SET_LOGIN_USER,
    payload: null,
  });
}

export const fetchChats = ()=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    console.log(data)
    if(data){
      dispatch({
        type: actionTypes.MY_CHATS,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}


export const accessChat = (userId)=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/chat`, { userId }, config);
    
    if(data){
      dispatch({
        type: actionTypes.ACCESSED_CHAT,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const selectChat = (data)=> async(dispatch)=>{
      dispatch({
        type: actionTypes.SELECT_CHAT,
        payload: data,
      });
    }


export const createGroupChat = (groupChatName, selectedUsers)=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.post(`/api/chat/group`, 
    {
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map((u) => u._id)),
    },
    config);
    console.log(data)
    if(data){
      toast.success("Group created Successfully.");
      dispatch({
        type: actionTypes.ADD_GROUP_CHAT,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}


export const updateGroup = (id, groupName)=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put(`/api/chat/rename`, 
    {
      chatId: id,
      chatName: groupName
    },
    config);

    if(data){
      toast.success("Group renamed Successfully.");
      dispatch({
        type: actionTypes.ACCESSED_CHAT,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const addUserInGroup = (userId, chatId)=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put(`/api/chat/groupadd`, 
    {
      chatId: chatId,
      userId: userId
    },
    config);

    if(data){
      toast.success("User Added Successfully.");
      dispatch({
        type: actionTypes.ACCESSED_CHAT,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const removeFromGroup = (userId, chatId)=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.put(`/api/chat/groupremove`, 
    {
      chatId: chatId,
      userId: userId
    },
    config);

    if(data){
      toast.success("User removed Successfully.");
      dispatch({
        type: actionTypes.ACCESSED_CHAT,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}


export const sendMessage = (content, chatId, socket)=> async(dispatch)=>{
  try {
    console.log("send message")
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.post(`/api/message`, 
    {
      chatId: chatId,
      content: content
    },
    config);

    if(data){
      dispatch({
        type: actionTypes.ADD_NEW_MESSAGE,
        payload: data,
      });
      socket.emit("new message", data)
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const getAllMessages = ( chatId)=> async(dispatch)=>{
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.get(`/api/message/${chatId}`,
    config);

    if(data){
      dispatch({
        type: actionTypes.SET_ALL_MESSAGES,
        payload: data,
      });
    }

    } catch (error) {
      if (error.response) {

        console.log(error.response.data.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      toast.error(error.response.data.message);
    }
}

export const setMessages = ( messages)=> async(dispatch)=>{
  dispatch({
    type: actionTypes.ADD_NEW_MESSAGE,
    payload: messages,
  });
}