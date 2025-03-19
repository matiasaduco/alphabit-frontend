'use client'

import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import Layout from './layout'
import { getAllChats } from '@/service/chats.service'

const Chats = () => {
  const [userId, setUserId] = useState([])
  const [search, setSearch] = useState('')
  const [chats, setChats] = useState([])
  const { chat, setChat } = useContext(ChatContext)

  useEffect(() => {
    const getChats = async () => {
      const response = await getAllChats()

      if (response.ok) {
        const json = await response.json()
        setChats(json ?? [])
      }
    }

    getChats()
    setUserId(Number(localStorage.getItem('userId')))
  }, [])

  return (
    <Layout header='Chats' setValue={setSearch}>
      {chats
        // ?.filter((chat) => chat.name.includes(search))
        .map((ch) => (
          <span
            key={ch.id}
            className={`border-y-[2px] border-white/20 h-[100px] flex items-center hover:bg-white/10 cursor-pointer ${
              ch.id === chat.id ? 'bg-white/15 hover:bg-white/15' : ''
            }`}
            onClick={() => setChat(ch)}
          >
            <img
              src='#user-picure'
              className='w-[70px] h-[70px] rounded-[50%] border ml-3 mr-4'
            />
            <span>
              <h5 className='text-xl'>
                {ch.name ||
                  ch.users.find((user) => user.id !== userId).username}
              </h5>
              <p className='text-gray-400'>{ch.lastMessage}</p>
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
