'use client'

import { redirect } from 'next/navigation.js'
import Chat from './(components)/chat.js'
import Chats from './(components)/(sidebar)/chats.js'
import { ChatProvider } from './(context)/chat.context.js'
import { useLayoutEffect, useState } from 'react'
import SideBar from './(components)/(sidebar)/sidebar.js'
import Contacts from './(components)/(sidebar)/contacts.js'

export default function Home() {
  const [value, setValue] = useState(0)
  const options = [<Chats />, <Contacts />]

  useLayoutEffect(() => {
    if (!localStorage.getItem('token')) {
      redirect('/login')
    }
  }, [])

  return (
    <ChatProvider>
      <section className='flex w-screen h-screen'>
        <SideBar value={value} setValue={setValue} />
        {options[value]}
        <Chat />
      </section>
    </ChatProvider>
  )
}
