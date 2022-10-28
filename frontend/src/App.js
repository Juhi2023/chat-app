import './App.css';
import {Route} from 'react-router-dom'
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import {Routes} from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="chats" element={<ChatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
