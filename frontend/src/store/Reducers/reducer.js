import * as actionTypes from '../constants';

const initialState = {
  screenSize:null,
  chats: [],
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  searchedUsers: null,
  myChats: [],
  accessedChat: null,
  getUsers: null,
  allMessages: [],
  notifications: []
}

const reducer = (state = initialState, action) => {
  
    switch (action.type) {
      case actionTypes.GET_WINDOW_SIZE:
        return {
          ...state,
          screenSize: action.payload,
        };
      case actionTypes.SET_CHATS:
        return {
          ...state,
          chats: action.payload,
        };

      case actionTypes.SET_LOGIN_USER:
        return {
          ...state,
          userInfo: action.payload,
        };

        case actionTypes.SEARCHED_USER:
          return {
            ...state,
            searchedUsers: action.payload,
          };
        
        case actionTypes.MY_CHATS:
          return {
            ...state,
            myChats: action.payload,
          };

        case actionTypes.ACCESSED_CHAT:
          return {
            ...state,
            accessedChat: action.payload,
            myChats: [action.payload, ...state.myChats]
          };
        
        case actionTypes.SELECT_CHAT:
          return {
            ...state,
            accessedChat: action.payload,
          };

        case actionTypes.GET_USERS:
        return {
          ...state,
          getUsers: action.payload,
        };
        
        case actionTypes.ADD_GROUP_CHAT:
        return {
          ...state,
          accessedChat: action.payload,
          myChats: [action.payload, ...state.myChats]
        };

        case actionTypes.SET_ALL_MESSAGES:
        return {
          ...state,
          allMessages: action.payload,
        };

        case actionTypes.ADD_NEW_MESSAGE:
        return {
          ...state,
          allMessages: [...state.allMessages, action.payload],
        };
        
        default: return state;
    }
}
export default reducer;
