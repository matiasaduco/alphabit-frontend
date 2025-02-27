import { useEffect, useState } from 'react'

const Chats = () => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setChats([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    setLoading(false)
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
        <span className='border h-[100px] flex hover:bg-white/10 cursor-pointer'>
          <img src='#user-picure' className='w-[100px] h-[100%]' />
          <span className='self-center'>
            <h5 className='text-2xl'>User</h5>
            <p className='text-gray-400'>Last Message</p>
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
