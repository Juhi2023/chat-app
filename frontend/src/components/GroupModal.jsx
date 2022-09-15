import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, FormControl, Input, InputLabel, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { searchUser } from '../store/Action/action';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function GroupModal(props) {

  const {handleClose, open} = props;
  const [values, setValues]= React.useState({name:'', query:'', users:[]})
  let [loading, setLoading] = React.useState(false)
  const submitHandler = ()=>{
    if(values.name === ''){
        toast.warn("Please Enter the Group Name!")
    }else if(values.users.length === 0){
        toast.warn("Select atleast one User!")
    }
  }
  
  const changeHandler=(field) => (e)=>{
    if(field=== 'query'){
        if(e.target.value!==''){
            setLoading(true)
        }else{
            setLoading(false)
        }

        setValues({...values, [field]:e.target.value})
        props.searchUser(e.target.value)
    }else{
        setValues({...values, [field]:e.target.value})
    }
  }

  const handleDelete = (user) => {
    setValues({...values, users: values.users.filter((elem)=>{return elem._id !== user._id})})
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
                <CardContent className='fw-bold fs-5' style={{color:'#FF4F5F'}}>
                    Create Group
                </CardContent>
              <CardContent>
                  <div className='mb-4'>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-name">Group Name</InputLabel>
                        <Input
                        id="standard-adornment-name"
                        value={values.name}
                        onChange={changeHandler('name')}
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-add">Add Member</InputLabel>
                        <Input
                        id="standard-adornment-add"
                        value={values.query}
                        onChange={changeHandler('query')}
                        />
                    </FormControl>
                </div>

                <div className="mt-2 d-flex flex-wrap mx-2">
                    {
                        values.users && values.users.map((user, index)=>{
                            return(
                                <Chip
                                label={user.name}
                                variant="outlined"
                                onDelete={()=>handleDelete(user)}
                                sx={{m:0.5, bgcolor:'#FFB753', color: 'white', textTransform: 'capitalize'}}
                                key={index}
                            />
                            )
                        })
                    }
                </div>

              </CardContent>

            <Box>
                <div className="text-center">
                    {(loading && !props.searchedUsers) && <CircularProgress color="inherit" />}
                </div>
                {props.searchedUsers && 
                <>
                    <Stack spacing={1} sx={{alignItems: 'center', height: 'calc(100% - 100px)'}} className="overflowY-scroll" >
                    {
                        props.searchedUsers && props.searchedUsers.slice(0, 4).map((elem, index)=>{
                                return (
                                    <Box className='rounded-1 p-2 d-flex align-items-center sidebar-item ' style={{width:'90%', backgroundColor:'rgb(28 32 104 / 5%)'}} key={index} onClick={()=>{if(!values.users.some(obj => obj._id === elem._id)) {setValues({...values, users:[...values.users, elem]})}}}>
                                        <Avatar
                                            alt=""
                                            src={elem.pic}
                                            sx={{ width: 35, height: 35, mr:2}}
                                        />
                                        <div>
                                            <div className='fw-normal text-capitalize name' style={{color:'#192A53'}}>
                                            {elem.name}
                                            </div>
                                            <div className='text-lowercase  email' style={{color:'gray', fontSize:'12px'}}>{elem.email}</div>
                                        </div>
                                    </Box>
                                )
                            })
                        }
                    </Stack> 
                </>}

            </Box>

            <CardActions className='d-flex justify-content-between mx-2 mt-5 mb-1'>
                <Button size="small" color="primary" variant="outlined"  onClick={submitHandler}>
                    Create
                </Button>
                <Button size="small" color="primary" variant="outlined" sx={{color:'gray', borderColor: 'gray'}} onClick={handleClose}>
                    Close
                </Button>
            </CardActions>
          </Card>

        </Box>
      </Modal>
    </div>
  );
}


const mapStateToProps = ({ reducer }) => {
    return {
        searchedUsers: reducer.searchedUsers
    };
  };
  export default(
    connect(mapStateToProps, {searchUser})(GroupModal)
  );
  