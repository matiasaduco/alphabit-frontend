'use client'

import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import Layout from './layout'
import { getAllMessagesByUserId } from '@/service/messages.service'
import { parseTime } from '@/utils/utils'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Menu, MenuItem } from '@mui/material'
import { deleteChat, getAllChats } from '@/service/chats.service'

const Chats = () => {
  const [userId, setUserId] = useState([])
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [search, setSearch] = useState('')
  const [chats, setChats] = useState([])
  const { chat, setChat } = useContext(ChatContext)

  useEffect(() => {
    const getChats = async () => {
      const response = await getAllChats()

      if (response.ok) {
        const json = await response.json()
        setChats(json ?? null)
      }
    }

    getChats()
    setUserId(Number(localStorage.getItem('userId')))
  }, [])

  const handleClick = async (message) => {
    const user =
      userId === message.sender.id ? message.receiver : message.sender
    const response = await getAllMessagesByUserId(user.id, 1)

    if (response.ok) {
      const json = await response.json()
      setChat({ user, messages: json })
    }
  }

  const handleContextMenu = (event, selectedChat) => {
    event.preventDefault()
    setSelectedChat(selectedChat)
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    )
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  const handleDelete = () => {
    const user =
      userId === selectedChat.sender.id
        ? selectedChat.receiver
        : selectedChat.sender

    deleteChat(user.id).then(
      setChats((chats) => chats.filter((ch) => ch.id !== selectedChat.id))
    )
    handleClose()
  }

  return (
    <Layout header='Chats' setValue={setSearch}>
      {chats
        // ?.filter((message) => message.name.includes(search))
        .map((message) => (
          <span key={message.id} className='group relative'>
            <span
              className={`border-y-[2px] border-white/20 h-[100px] relative flex items-center hover:bg-white/10 cursor-pointer ${
                chat?.messages?.some((m) => m.id === message.id)
                  ? 'bg-white/15 hover:bg-white/15'
                  : ''
              }`}
              onClick={() => handleClick(message)}
              onContextMenu={(evt) => handleContextMenu(evt, message)}
            >
              <img
                src='#user-picure'
                className='w-[70px] h-[70px] rounded-[50%] border ml-3 mr-4'
              />
              <span className='flex flex-wrap w-full items-center'>
                <h5 className='text-xl truncate w-[150px]'>
                  {userId === message.sender.id
                    ? message.receiver.username
                    : message.sender.username}
                </h5>
                <span className='text-gray-400 text-[13px] ml-auto mr-3'>
                  {parseTime(message.createdAt)}
                </span>
                <span className='text-gray-400 text-sm truncate w-[200px]'>
                  {message.text}
                </span>
              </span>
              {/* <img src='#Mute' className='absolute right-0' /> */}
            </span>

            <KeyboardArrowDown
              key={`arrow-${message.id}`}
              className='absolute bottom-2 right-2 scale-0 cursor-pointer group-hover:scale-100 group-hover:transition group-hover:duration-200'
              onClick={(evt) => handleContextMenu(evt, message)}
            />
          </span>
        ))}

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {/* <MenuItem onClick={handleClose}>Responder</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>Reenviar</MenuItem> */}
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>
    </Layout>
  )
}

export default Chats
