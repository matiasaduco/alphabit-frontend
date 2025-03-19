'use client'

import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import Layout from './layout'
import { getAllChats } from '@/service/chats.service'

const Chats = () => {
  const [search, setSearch] = useState('')
  const [chats, setChats] = useState([])
  const { setChat } = useContext(ChatContext)
  const userId = Number(localStorage.getItem('userId'))

  useEffect(() => {
    const getChats = async () => {
      const response = await getAllChats()

      if (response.ok) {
        const json = await response.json()
        setChats(json ?? [])
      }
    }

    getChats()
  }, [])

  return (
    <Layout header='Chats' setValue={setSearch}>
      {chats
        // ?.filter((chat) => chat.name.includes(search))
        .map((chat) => (
          <span
            key={chat.id}
            className='border-y-[2px] border-white/20 h-[100px] flex items-center hover:bg-white/10 cursor-pointer'
            onClick={() => setChat(chat)}
          >
            <img
              src='#user-picure'
              className='w-[70px] h-[70px] rounded-[50%] border ml-3 mr-4'
            />
            <span>
              <h5 className='text-xl'>
                {chat.name ||
                  chat.users.find((user) => user.id !== userId).username}
              </h5>
              <p className='text-gray-400'>{chat.lastMessage}</p>
            </span>
            {/* Date */}
            {/* <img src='#Mute' className='absolute right-0' /> */}
            {/* Config */}
          </span>
        ))}
    </Layout>
  )
}

export default Chats
