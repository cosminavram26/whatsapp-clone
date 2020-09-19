import React from 'react'
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebarHeader' >
                <Avatar src='https://instagram.fsbz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/116156767_214304889911205_1453724608248520653_n.jpg?_nc_ht=instagram.fsbz1-1.fna.fbcdn.net&_nc_ohc=oBKKNUNA9KMAX9bEh2R&oh=99190fc8a59cdb037e4040ed12a3ab62&oe=5F877C93' />
                <div className='siderbarHeaderRight'>
                    <IconButton >
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton >
                        <ChatIcon />
                    </IconButton>
                    <IconButton >
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebarSearch'>
                <div className='sidebarSearchContainer'>
                    <SearchOutlinedIcon />
                    <input placeholder='Search ore start a new chat' type='text' />
                </div>
            </div>
            <div className='sidebarChats'>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
