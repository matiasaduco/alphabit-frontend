'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import { getMessagesByChatId, sendMessage } from '@/service/messages.service'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const { chat } = useContext(ChatContext)
  const userId = Number(localStorage.getItem('userId'))
  const container = useRef()

  const base = 'rounded-lg max-w-[60%] mx-2 my-1 p-2'
  const senderClass = 'bg-blue-600 text-white self-end'
  const receiverClass = 'bg-blue-800'

  useEffect(() => {
    const getMessages = async () => {
      const response = await getMessagesByChatId(chat.id)

      if (response.ok) {
        const json = await response.json()
        setMessages(json)
      }
    }

    if (chat?.id) getMessages()
  }, [chat])

  useEffect(() => {
    if (chat?.id) {
      const scrollHeight = container.current.scrollHeight
      const height = container.current.clientHeight
      const maxScrollTop = scrollHeight - height
      container.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }, [messages])

  const handleSendMessage = async ({ key, target }) => {
    if (key === 'Enter') {
      const response = await sendMessage(chat.id, target.value)
      if (response.ok) {
        const json = await response.json()
        setMessages((prevMessages) => [...prevMessages, json])
      }

      target.value = ''
    }
  }

  return !chat?.id ? (
    <img src='#BackgroundEmptyChat' className='w-full' />
  ) : (
    <article ref={container} className='w-full h-full flex flex-col'>
      <div>
        <img src='#profile' />
        <b className='text-white'>
          {chat?.users?.find((user) => user.id !== userId).username}
        </b>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto'>
        <div className='flex flex-col relative justify-end items-start'>
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
