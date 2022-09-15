import React, { useEffect, useState } from 'react'
import {Button, TextField, Container, FormControl, InputLabel, Input, InputAdornment, IconButton , Stack} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { signupUser } from '../../store/Action/action';


function SignUp(props) {
  const [values, setValues] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword:'',
    pic:'',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    if(prop==='pic'){
      if(event.target.files[0].type ===  "image/jpeg" || event.target.files[0].type ===  "image/png" || event.target.files[0].type ===  "image/jpg"){
        const data = new FormData();
        data.append("file", event.target.files[0]);
        data.append("upload_preset", "TalksUp");
        data.append("cloud_name", "photostore");
        fetch("https://api.cloudinary.com/v1_1/photostore/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setValues({ ...values, pic: data.url.toString() });
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
        toast.warn("Please upload only image!");
      }
    }else{
      setValues({ ...values, [prop]: event.target.value });
    }
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
    if(!values.name || !values.email || !values.password || !values.confirmPassword){
      toast.warn("Please fill all the fields.");
    }else if(values.password !== values.confirmPassword){
      toast.warn("Passwords Do Not Match.");
    }else{
      props.signupUser(values.name, values.email, values.password , values.pic);
    }
  }

 

  return (
    <Container>
      <Stack spacing={3}>
        <div>
          <TextField fullWidth id="standard-basic" label="Name" variant="standard" value={values.name} onChange={handleChange('name')}/>
        </div>

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
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="standard-adornment-confirmPassword">Confirm Password</InputLabel>
            <Input
              id="standard-adornment-confirmPassword"
              type={values.showPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
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
          <InputLabel htmlFor="photo" sx={{mt:5}}>Upload Photo</InputLabel>
          <input
            type='file'
            style={{marginTop:'10px'}}
            onChange={handleChange('pic')}
          />
        </div>

        <div>
          <Button fullWidth variant="contained" size="small" sx={{backgroundColor: '#192A53', textTransform: 'capitalize', mt:5, mb:3}} onClick={submitHandler}>
            SignUp
          </Button>
        </div>
      </Stack>
        
    </Container>
  )
}


const mapStateToProps = ({ reducer }) => {
  return {  };
};
export default(
  connect(mapStateToProps, {signupUser})(SignUp)
);
