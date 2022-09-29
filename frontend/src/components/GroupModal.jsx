import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, FormControl, Input, InputLabel, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { searchUser, updateGroup, addUserInGroup, removeFromGroup } from '../store/Action/action';


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

function AddGroupModal(props) {

  const {handleClose, open} = props;
  const [values, setValues]= React.useState({name:'', query:'', users:[]})
  let [loading, setLoading] = React.useState(false)

  const renameHandler = ()=>{
    if(values.name === ''){
        toast.warn("Please Enter the Group Name!")
    }else{
        props.updateGroup(props.accessedChat._id, values.name);
        handleClose();
    }
  }

  const handleAddUser = (elem)=>{
    if(!values.users.some(obj => obj._id === elem._id)) 
    {
        setValues({...values, users:[...values.users, elem]})
        props.addUserInGroup(elem._id, props.accessedChat._id);
    }else{
        toast.warn('User is already in Group!')
    }
  }

  const submitHandler = (users)=>{
    if(values.name === ''){
        toast.warn("Please Enter the Group Name!")
    }else if(values.users.length <= 1){
        toast.warn("Select atleast two User!")
    }else{
        handleClose();
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
    props.removeFromGroup(user._id, props.accessedChat._id);
  };

  React.useEffect(()=>{
    let users = [];
    props.accessedChat.users.forEach((val)=> users.push(val))
    setValues({...values, name: props.accessedChat.chatName, users:users})
  },[props.accessedChat])

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
                {props.accessedChat.chatName}
            </CardContent>

            <div className='pb-1 overflow-scroll' style={{height: '70vh'}}>
                <CardContent>
                <div className="my-3 d-flex flex-wrap mx-2">
                        {
                            values.users.map((user, index)=>{
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
                    <Button size="small" color="primary" variant="outlined"  onClick={renameHandler}>
                        rename
                    </Button>
                    <div className='mt-3'>
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-add">Add Member</InputLabel>
                            <Input
                            id="standard-adornment-add"
                            value={values.query}
                            onChange={changeHandler('query')}
                            />
                        </FormControl>
                    </div>

                    

                </CardContent>

                <Box>
                    <div className="text-center">
                        {(loading && !props.searchedUsers) && <CircularProgress color="inherit" />}
                    </div>
                    {loading && props.searchedUsers && 
                    <>
                        <Stack spacing={1} sx={{alignItems: 'center', height: 'calc(100% - 100px)'}} className="overflowY-scroll" >
                        {
                            props.searchedUsers && props.searchedUsers.slice(0, 4).map((elem, index)=>{
                                    return (
                                        <Box className='rounded-1 p-2 d-flex align-items-center sidebar-item ' style={{width:'90%', backgroundColor:'rgb(28 32 104 / 5%)'}} key={index} onClick={()=>handleAddUser(elem)}>
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
            </div>
              

            <CardActions className='d-flex justify-content-between mx-2  mb-1'>
                <Button size="small" color="error" variant="outlined"  onClick={submitHandler}>
                    Leave Group
                </Button>
                <Button size="small" color="primary" variant="outlined" sx={{color:'gray', borderColor: 'gray'}} onClick={()=>{handleClose(); setLoading(false); setValues({name:'', query:'', users:[]})}}>
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
        searchedUsers: reducer.searchedUsers,
        accessedChat: reducer.accessedChat
    };
  };
  export default(
    connect(mapStateToProps, {searchUser, updateGroup, addUserInGroup, removeFromGroup})(AddGroupModal)
  );
  