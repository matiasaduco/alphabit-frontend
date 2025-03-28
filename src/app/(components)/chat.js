'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import { deleteMessage, sendMessage } from '@/service/messages.service'
import { parseTime } from '@/utils/utils'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Close, KeyboardArrowDown, Reply } from '@mui/icons-material'

const Chat = () => {
  const [userId, setUserId] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [contextMenu, setContextMenu] = useState(null)
  // const [page, setPage] = useState(1)
  const { chat, setChat } = useContext(ChatContext)
  const container = useRef()

  const base =
    'flex flex-col rounded-lg min-w-[100px] max-w-[60%] mx-2 my-1 p-2 relative group'

  useEffect(() => {
    if (chat) {
      setUserId(Number(localStorage.getItem('userId')))
      container.current.scrollTop = container.current.scrollHeight
    }
  }, [chat])

  const handleSendMessage = async ({ key, target }) => {
    if (key === 'Enter') {
      const response = await sendMessage(
        target.value,
        chat.user.id,
        selectedMessage?.isAnswered ? selectedMessage.id : null
      )

      setSelectedMessage({ ...selectedMessage, isAnswered: false })

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

  const handleResponse = () => {
    setSelectedMessage({ ...selectedMessage, isAnswered: true })
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
    setContextMenu(null)
  }

  const scrollToReplied = (id) => {
    console.log(container.current.querySelector(`[data-key="${id}"]`), id)
    container.current.querySelector(`[data-key="${id}"]`).scrollIntoView({
      behavior: 'smooth',
    })
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
            data-key={message.id}
            className={`${base} ${
              message.sender.id === userId
                ? 'bg-blue-600 self-end'
                : 'bg-blue-800'
            }`}
            onContextMenu={(evt) => handleContextMenu(evt, message)}
          >
            {message.responseTo && (
              <span
                className='flex flex-col rounded-md bg-black/20 text-gray-400 border-l-4 border-l-blue-400 p-1 mb-2'
                onClick={() => scrollToReplied(message.responseTo.id)}
              >
                <b className='text-sm text-blue-400 truncate'>
                  {message.responseTo.sender?.username ??
                    chat.messages.find((m) => m.id === message.responseTo.id)
                      .sender.username}
                </b>
                <span className='truncate'>
                  {message.responseTo.text ??
                    chat.messages.find((m) => m.id === message.responseTo.id)
                      .text}
                </span>
              </span>
            )}
            <span className='leading-none'>{message.text}</span>
            <span className='text-gray-400 text-[13px] self-end leading-none'>
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
          onClose={() => setContextMenu(null)}
          anchorReference='anchorPosition'
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleResponse}>Reply</MenuItem>
          {/* <MenuItem onClick={handleClose}>Reenviar</MenuItem> */}
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </div>

      <span className='min-w-[350px] w-[50%] mx-auto p-4 bg-transparent'>
        {selectedMessage?.isAnswered && (
          <div className='flex justify-between gap-2 p-2 bg-white/10 rounded-t-lg'>
            <IconButton
              onClick={() =>
                setSelectedMessage({ ...selectedMessage, isAnswered: false })
              }
              style={{ color: 'white' }}
            >
              <Reply />
            </IconButton>
            <div className='w-[330px] rounded-md bg-blue-400/10 text-gray-400 border-l-4 border-l-blue-400 pl-2 flex flex-col'>
              <b className='text-sm text-blue-400 truncate'>
                Reply to: {selectedMessage.sender.username}
              </b>
              <p className='truncate'>{selectedMessage.text}</p>
            </div>
            <IconButton
              onClick={() =>
                setSelectedMessage({ ...selectedMessage, isAnswered: false })
              }
              style={{ color: 'white' }}
            >
              <Close />
            </IconButton>
          </div>
        )}

        <input
          type='text'
          placeholder='Type a message'
          className={`w-full p-2 bg-white/10 ${
            selectedMessage?.isAnswered ? 'rounded-b-lg' : 'rounded-lg'
          }`}
          onKeyUp={handleSendMessage}
        />
      </span>
    </article>
  )
}

export default Chat
