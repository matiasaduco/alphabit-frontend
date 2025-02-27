import { useContext, useEffect } from 'react'
import { ChatContext } from '@/app/(context)/context'

const Chat = () => {
  const { chat } = useContext(ChatContext)

  useEffect(() => {
    console.log('Chat:', chat)
  }, [chat])

  const base = 'p-2 rounded-lg max-w-[60%] mb-4'
  const senderClass = 'bg-blue-600 text-white self-end mr-2'
  const receiverClass = 'bg-blue-800 ml-2'

  return (
    <div className='border grow flex flex-col justify-end items-start'>
      <span className={`${base} ${true ? senderClass : receiverClass}`}>
        Hola!
      </span>
      <span className={`${base} ${false ? senderClass : receiverClass}`}>
        Adios!
      </span>
      <span className='w-full p-3 bg-gray-300 flex'>
        <input
          type='text'
          placeholder='Type a message'
          className='w-full p-1 rounded-lg'
        />
      </span>
    </div>
  )
}

export default Chat
