'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import { deleteMessage, sendMessage } from '@/service/messages.service'
import { parseTime } from '@/utils/utils'
import { Menu, MenuItem } from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'

const Chat = () => {
  const [userId, setUserId] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  const [page, setPage] = useState(1)
  const { chat, setChat } = useContext(ChatContext)
  const container = useRef()

  const base = 'rounded-lg max-w-[60%] mx-2 my-1 flex gap-2 relative group'

  useEffect(() => {
    if (chat) {
      setUserId(Number(localStorage.getItem('userId')))
      container.current.scrollTop = container.current.scrollHeight
    }
  }, [chat])

  const handleSendMessage = async ({ key, target }) => {
    if (key === 'Enter') {
      const response = await sendMessage(chat.user.id, target.value)
      if (response.ok) {
        const json = await response.json()
        setChat({
          ...chat,
          messages: [json, ...chat.messages],
        })
      }

      target.value = ''
    }
  }

  if (chat)
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        setChat(null)
      }
    })

  const handleContextMenu = (event, message) => {
    event.preventDefault()
    setSelectedMessage(message)
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
    deleteMessage(selectedMessage.id).then(
      setChat({
        ...chat,
        messages: chat.messages.filter(
          (message) => message.id !== selectedMessage.id
        ),
      })
    )
    handleClose()
  }

  return !chat ? (
    <img src='#BackgroundEmptyChat' className='w-full' />
  ) : (
    <article id='article' className='w-full h-full flex flex-col'>
      <div className='flex bg-white/10 p-4 gap-2 cursor-pointer'>
        <img src='#profile' />
        <b className='text-white'>{chat.user.username}</b>
      </div>

      <div
        ref={container}
        className='flex flex-col-reverse relative items-start flex-1 min-h-0 overflow-y-auto'
      >
        {chat.messages?.map((message, index) => (
          <p
            key={index}
            className={`${base} ${
              message.sender.id === userId
                ? 'bg-blue-600 self-end'
                : 'bg-blue-800'
            }`}
            onContextMenu={(evt) => handleContextMenu(evt, message)}
          >
            <span className='py-1 px-2'>{message.text}</span>
            <span className='text-gray-400 text-[13px] w-[45px] self-end ml-auto'>
              {parseTime(message.createdAt)}
            </span>
            <KeyboardArrowDown
              className='absolute top-0 right-0 scale-0 cursor-pointer group-hover:scale-100 group-hover:transition group-hover:duration-200'
              onClick={(evt) => handleContextMenu(evt, message)}
            />
          </p>
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
      </div>

      <span className='w-full p-4 bg-transparent'>
        <input
          type='text'
          placeholder='Type a message'
          className='w-full p-2 rounded-lg text-black'
          onKeyUp={handleSendMessage}
        />
      </span>
    </article>
  )
}

export default Chat
