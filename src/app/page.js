'use client'

import { redirect } from 'next/navigation.js'
import Chat from './(components)/chat.js'
import Chats from './(components)/(sidebar)/chats.js'
import { ChatProvider } from './(context)/chat.context.js'
import { useLayoutEffect, useState } from 'react'
import SideBar from './(components)/(sidebar)/sidebar.js'
import Contacts from './(components)/(sidebar)/contacts.js'
import { io } from 'socket.io-client'

export default function Home() {
  const [value, setValue] = useState(0)
  const options = [<Chats />, <Contacts />]

  useLayoutEffect(() => {
    if (!localStorage.getItem('token')) {
      redirect('/login')
    }
  }, [])

  if (localStorage.getItem('token')) {
    const socket = io(`${process.env.API_URL}/events`, {
      query: { userId: localStorage.getItem('userId') },
    })

    socket.on("connect", () => {
      console.log(`Connected to server with ID: ${socket.id}`);
    });
  }

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
