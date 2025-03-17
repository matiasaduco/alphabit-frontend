'use client'

import { redirect } from 'next/navigation.js'
import Chat from './(components)/chat.js'
import Chats from './(components)/chats.js'
import { ChatProvider } from './(context)/context.js'
import { useLayoutEffect } from 'react'
// import SideBar from './(components)/sidebar.js'

export default function Home() {
  useLayoutEffect(() => {
    if (!localStorage.getItem('token')) {
      redirect('/login')
    }
  })

  return (
    <ChatProvider>
      <section className='flex w-screen h-screen'>
        {/* <SideBar /> */}
        <Chats />
        <Chat />
      </section>
    </ChatProvider>
  )
}
