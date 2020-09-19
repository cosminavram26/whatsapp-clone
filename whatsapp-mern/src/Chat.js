import React, { useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios'

const Chat = ({ messages }) => {

    const [input, setInput] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault()
        
        await axios.post('/messages/new', {
            name: 'Cosmin Avram',
            message: input,
            timestamp: 'just now',
            received: false
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className='chatHeader'>
                <Avatar />
                <div className='chatHeaderInfo' >
                    <h3>Room name</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className='chatHeaderRight' >
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='chatBody' >
                {
                    messages.map(message => (
                        <p className={`chatMessage ${message.received && 'chatReciever'}`}>
                        <span className='chatName'> {message.name} </span>
                        {message.message}
                        <span className='chatTimeStamp'>
                            {message.timestamp}
                        </span>
                </p>
                    ))
                }
            </div>
            <div className='chatFooter'>
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={ e => setInput(e.target.value) }
                        placeholder = 'Type a message'
                        type='Text'
                    />
                    <button onClick={sendMessage} type='submit' >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
