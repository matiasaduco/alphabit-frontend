'use client'

import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '@/app/(context)/chat.context'
import Layout from './layout'
import { getAllChats } from '@/service/chats.service'
import { parseTime } from '@/utils/utils'

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
            className={`border-y-[2px] border-white/20 h-[100px]  flex items-center hover:bg-white/10 cursor-pointer ${
              ch.id === chat.id ? 'bg-white/15 hover:bg-white/15' : ''
            }`}
            onClick={() => setChat(ch)}
          >
            <img
              src='#user-picure'
              className='w-[70px] h-[70px] rounded-[50%] border ml-3 mr-4'
            />
            <span className='flex flex-wrap w-full items-center'>
              <h5 className='text-xl truncate w-[150px]'>
                {ch.name ||
                  ch.users.find((user) => user.id !== userId).username}
              </h5>
              <span className='text-gray-400 text-[13px] ml-auto mr-3'>
                {parseTime(ch.messages[0].createdAt)}
              </span>
              <span className='text-gray-400 text-sm truncate w-[200px]'>
                {ch.messages[0].text}
              </span>
            </span>
            {/* <img src='#Mute' className='absolute right-0' /> */}
            {/* Config */}
          </span>
        ))}
    </Layout>
  )
}

export default Chats
