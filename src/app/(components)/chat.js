import { useContext, useEffect } from 'react'
import { ChatContext } from '@/app/(context)/context'

const Chat = () => {
  const { chat } = useContext(ChatContext)

  useEffect(() => {
    fetch(process.env.API_URL + '/chats')
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error(err))
  }, [chat])

  const base = 'p-2 rounded-lg max-w-[60%] mb-4'
  const senderClass = 'bg-blue-600 text-white self-end mr-2'
  const receiverClass = 'bg-blue-800 ml-2'

  return chat ? (
    <img src='#BackgroundEmptyChat' className='w-[100%]' />
  ) : (
    <div className='grow flex flex-col justify-end items-start'>
      {chat.map((message, index) => (
        <span
          key={index}
          className={`${base} ${message.sender ? senderClass : receiverClass}`}
        >
          {message.text}
        </span>
      ))}

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
