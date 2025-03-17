'use client'

import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '@/app/(context)/context'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { setChat } = useContext(ChatContext)

  useEffect(() => {
    const getChats = async () => {
      const token = localStorage.getItem('token')

      const response = await fetch(`${process.env.API_URL}/chats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        setChats(json.chats ?? [])
      }
    }

    getChats()
  })

  return (
    <div className='bg-black/40 w-[400px] flex flex-col relative overflow-y-auto'>
      <div className='flex flex-col gap-2 sticky top-0 p-4'>
        <span className='flex mb-4'>
          <h3 className='text-3xl'>Chats</h3>
          {/* <img src='#New Chat' className='ml-auto' /> */}
          {/* <img src='#Options' /> */}
        </span>

        <input type='text' placeholder='Search' />

        <span className='flex mb-1'>
          {/* <img src='#Todos' /> */}
          {/* <img src='#No Leídos' /> */}
          {/* <img src='#Favoritos' /> */}
          {/* <img src='#Grupos' /> */}
        </span>
      </div>

      {chats?.map((chat) => (
        <span
          key={chat.id}
          className='border-y-[2px] border-white/20 h-[100px] flex items-center hover:bg-white/10 cursor-pointer'
          onClick={() => setChat(chat)}
        >
          <img
            src='#user-picure'
            className='w-[80px] h-[80px] rounded-[50%] border mr-3'
          />
          <span>
            <h5 className='text-2xl'>{chat.name}</h5>
            <p className='text-gray-400'>{chat.lastMessage}</p>
          </span>
          {/* Date */}
          {/* <img src='#Mute' className='absolute right-0' /> */}
          {/* Config */}
        </span>
      ))}
    </div>
  )
}

export default Chats
