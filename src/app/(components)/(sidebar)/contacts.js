'use client'

import { useContext, useEffect, useState } from 'react'
import Layout from './layout.js'
import { ChatContext } from '@/app/(context)/chat.context.js'
import { getUserContacts } from '@/service/users.service.js'
import { getAllMessagesByUserId } from '@/service/messages.service.js'

const Contacts = () => {
  const [search, setSearch] = useState('')
  const [contacts, setContacts] = useState([])
  const { setChat } = useContext(ChatContext)

  useEffect(() => {
    const getContacts = async () => {
      const response = await getUserContacts()

      if (response.ok) {
        const json = await response.json()
        setContacts(json ?? null)
      }
    }

    getContacts()
  }, [])

  const handleClick = async (contact) => {
    const response = await getAllMessagesByUserId(contact.id, 1)

    if (response.ok) {
      const json = await response.json()
      setChat({ user: contact, messages: json })
    }
  }

  return (
    <Layout header='Contactos' setValue={setSearch}>
      {contacts
        ?.filter((contact) => contact.username.includes(search))
        .map((contact) => (
          <span
            key={contact.id}
            className='border-y-[2px] border-white/20 h-[100px] flex items-center hover:bg-white/10 cursor-pointer'
            onClick={() => handleClick(contact)}
          >
            <img
              src='#user-picure'
              className='w-[70px] h-[70px] rounded-[50%] border ml-3 mr-4'
            />
            <span>
              <h5 className='text-xl'>{contact.username}</h5>
            </span>
            {/* <img src='#Mute' className='absolute right-0' /> */}
            {/* Config */}
          </span>
        ))}
    </Layout>
  )
}

export default Contacts
