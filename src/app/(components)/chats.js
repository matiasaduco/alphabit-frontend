import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../(context)/context'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { setChat } = useContext(ChatContext)

  useEffect(() => {
    setChats([{ id: 1, name: 'User', lastMessage: 'Last Message' }])
  }, [])

  return (
    <div className='border w-[400px] flex flex-col relative overflow-y-auto'>
      <div className='flex flex-col gap-2 sticky top-0 bg-black'>
        <span className='flex mb-4'>
          <h3 className='text-3xl'>Chats</h3>
          <img src='#New Chat Icon' className='ml-auto' />
          <img src='#Options' />
        </span>

        <input type='text' placeholder='Search' />

        <span className='flex mb-1'>
          <img src='#Todos' />
          <img src='#No Leídos' />
          <img src='#Favoritos' />
          <img src='#Grupos' />
        </span>
      </div>
      {chats.map((chat) => (
        <span
          key={chat.id}
          className='border h-[100px] flex hover:bg-white/10 cursor-pointer'
          onClick={() => setChat(chat)}
        >
          <img
            src='#user-picure'
            className='w-[100px] h-[100%] rounded-[50%] border mr-3'
          />
          <span className='self-center'>
            <h5 className='text-2xl'>{chat.name}</h5>
            <p className='text-gray-400'>{chat.lastMessage}</p>
          </span>
          {/* Date */}
          {/* <img src='#mute-icon' className='absolute right-0' /> */}
          {/* Config */}
        </span>
      ))}
    </div>
  )
}

export default Chats
