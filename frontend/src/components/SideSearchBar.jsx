import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton, InputBase, Skeleton, Stack, Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { searchUser, accessChat, fetchChats} from '../store/Action/action';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function SideSearchBar(props) {

 const [state, setState] = React.useState(false);
 const [search, setSearch] = React.useState('');

 const handleSearch = ()=>{
    if(!search){
        toast.warn("Please Enter something.")
    }else{
        props.searchUser(search);
    }
 }

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    
    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 280}}
      role="presentation"
      style={{height:'100%', backgroundColor: '#F3E8E4'}}
    >
        <InputBase
            className='bg-light w-75 p-2 rounded-2'
            sx={{ mx:1, my:2, flex: 1}}
            placeholder="Search ..."
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
        </IconButton>
        <div className=' overflow-scroll' style={{height: '88%'}}>
            
            {props.searchedUsers && props.searchedUsers.length ?

            <Stack spacing={1} sx={{alignItems: 'center', mt:2}} >
                {
                    props.searchedUsers.map((elem, index)=>{
                        return (
                            <Box className='bg-light rounded-1 p-2 d-flex align-items-center sidebar-item' style={{width:'90%'}} key={index} onClick={()=>{props.accessChat(elem._id); setState(false);}}>
                            
                                <Avatar
                                    alt=""
                                    src={elem.pic}
                                    sx={{ width: 40, height: 40, mr:2}}
                                />
                                <div>
                                    <div className='fw-normal text-capitalize name' style={{color:'#192A53'}}>{elem.name}</div>
                                    <div className='text-lowercase overflow-hidden email' style={{color:'gray', fontSize:'12px'}}>{elem.email}</div>
                                </div>
                            </Box>
                        )
                    })
                }
            </Stack>
            :
            <Stack spacing={1} sx={{alignItems: 'center', mt:2}}>
                {
                    props.searchedUsers && props.searchedUsers.length===0 ?
                    <Box>
                        User Not Found
                    </Box>
                    :
                    <>
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                        <Skeleton variant="rounded" width={'90%'} height={60} />
                    </>
                }
            </Stack>
            }
        </div>
    </Box>
  );

  useEffect(()=>{},[props.accessedChat])
  
  return (
    <div>
        <Tooltip title="Search User">
            <Button onClick={toggleDrawer(true)} size="small" style={{minWidth:'fit-content', color: 'gray'}}>
                <div>
                    <SearchIcon/>
                </div>
            </Button>
        </Tooltip>
          
          <SwipeableDrawer
            anchor={'right'}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
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
    connect(mapStateToProps, {searchUser, accessChat, fetchChats})(SideSearchBar)
  );
  