'use client'

import Chat from './(components)/chat'
import Chats from './(components)/chats'
import SideBar from './(components)/sidebar'

export default function Home() {
  return (
    <section className='flex w-screen h-screen border'>
      <SideBar />
      <Chats />
      <Chat />
    </section>
  )
}
