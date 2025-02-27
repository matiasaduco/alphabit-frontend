'use client'

import { useState } from 'react'
import Chat from './(components)/chat'
import Chats from './(components)/chats'
import { ChatProvider } from './(context)/context'
// import SideBar from './(components)/sidebar'

export default function Home() {
  const [chat, setChat] = useState({})

  return (
    <ChatProvider>
      <section className='flex w-screen h-screen border'>
        {/* <SideBar /> */}
        <Chats />
        <Chat />
      </section>
    </ChatProvider>
  )
}
