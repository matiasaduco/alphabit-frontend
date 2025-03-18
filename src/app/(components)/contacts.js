'use client'

import { useContext, useEffect, useState } from 'react'
import Layout from './layout.js'
import { ChatContext } from '@/app/(context)/context.js'
import { getAllContacts } from '@/service/contacts.service.js'
import { getChatByContactId } from '@/service/chats.service.js'

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const { setChat } = useContext(ChatContext)

  useEffect(() => {
    const getContacts = async () => {
      const response = await getAllContacts()

      if (response.ok) {
        const json = await response.json()
        setContacts(json.chats ?? [])
      }
    }

    getContacts()
  }, [])

  const handleClick = async (contact) => {
    const response = await getChatByContactId(contact.id)

    if (response.ok) {
      const json = await response.json()
      setChat(json.chat)
    }
  }

  return (
    <Layout>
      {contacts?.map((contact) => (
        <span
          key={chat.id}
          className='border-y-[2px] border-white/20 h-[100px] flex items-center hover:bg-white/10 cursor-pointer'
          onClick={() => handleClick(contact)}
        >
          <img
            src='#user-picure'
            className='w-[80px] h-[80px] rounded-[50%] border mr-3'
          />
          <span>
            <h5 className='text-2xl'>{chat.name}</h5>
            <p className='text-gray-400'>{chat.lastMessage}</p>
          </span>
          {/* <img src='#Mute' className='absolute right-0' /> */}
          {/* Config */}
        </span>
      ))}
    </Layout>
  )
}

export default Contacts
