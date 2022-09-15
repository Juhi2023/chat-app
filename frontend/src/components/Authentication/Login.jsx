import React, { useEffect, useState } from 'react'
import {Button, Container, FormControl, InputLabel, Input, InputAdornment, IconButton , Stack, Divider} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { loginUser } from '../../store/Action/action';


function Login(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate()

  const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = ()=>{
    if(!values.email || !values.password){
      toast.warn("Please fill all the fields.");
    }else{
      props.loginUser(values.email, values.password);
    }
  }

  useEffect(() => {
    if (props.userInfo) {
      navigate("/chats");
    }else{
      navigate("/");
    }
  }, [navigate, props.userInfo]);

  return (
    <Container>

      <Stack spacing={3}>

        <div>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
            <Input
              id="standard-adornment-email"
              value={values.email}
              onChange={handleChange('email')}
            />
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div>
          <Button fullWidth variant="contained" size="small" sx={{backgroundColor: '#192A53', textTransform: 'capitalize', mt:5, mb:3}} onClick={submitHandler}>
            Login
          </Button>
          <Divider sx={{color:'black'}}>Or</Divider>
          <Button fullWidth size="small" sx={{textTransform: 'capitalize', mt:2}} 
          onClick={() => {setValues({...values, email: "guest@example.com", password: "1234"})}}>
            Login As a Guest User
          </Button>
        </div>
      </Stack>
        
    </Container>
  )
}


const mapStateToProps = ({ reducer }) => {
  return {
    userInfo: reducer.userInfo,
  };
};
export default(
  connect(mapStateToProps, {loginUser})(Login)
);
