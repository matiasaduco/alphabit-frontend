'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import { getMessagesByChatId, sendMessage } from '@/service/messages.service'

const Chat = () => {
  const [userId, setUserId] = useState([])
  const [page, setPage] = useState(1)
  const [messages, setMessages] = useState([])
  const { chat, setChat } = useContext(ChatContext)
  const container = useRef()

  const base = 'rounded-lg max-w-[60%] mx-2 my-1 p-2'
  const senderClass = 'bg-blue-600 text-white self-end'
  const receiverClass = 'bg-blue-800'

  useEffect(() => {
    const getMessages = async () => {
      const response = await getMessagesByChatId(chat.id, page)

      if (response.ok) {
        const json = await response.json()
        setMessages(json)
      }
    }

    if (chat?.id) {
      getMessages()
      setUserId(Number(localStorage.getItem('userId')))
    }
  }, [chat])

  useEffect(() => {
    if (chat.id) {
      container.current.scrollTop = container.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async ({ key, target }) => {
    if (key === 'Enter') {
      const response = await sendMessage(chat.id, target.value)
      if (response.ok) {
        const json = await response.json()
        setMessages((prevMessages) => [json, ...prevMessages])
      }

      target.value = ''
    }
  }

  if (chat.id)
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        setChat({})
      }
    })

  return !chat?.id ? (
    <img src='#BackgroundEmptyChat' className='w-full' />
  ) : (
    <article id='article' className='w-full h-full flex flex-col'>
      <div className='flex bg-white/10 p-4 gap-2 cursor-pointer'>
        <img src='#profile' />
        <b className='text-white'>
          {chat?.users?.find((user) => user.id !== userId).username}
        </b>
      </div>

      <div ref={container} className='flex-1 min-h-0 overflow-y-auto'>
        <div className='flex flex-col-reverse relative justify-end items-start'>
          {messages.length &&
            messages?.map((message, index) => (
              <span
                key={index}
                className={`${base} ${
                  message.sender === userId ? senderClass : receiverClass
                }`}
              >
                {message.text}
              </span>
            ))}
        </div>
      </div>

      <span className='w-full p-3 bg-gray-300'>
        <input
          type='text'
          placeholder='Type a message'
          className='w-full p-1 rounded-lg text-black'
          onKeyUp={handleSendMessage}
        />
      </span>
    </article>
  )
}

export default Chat
