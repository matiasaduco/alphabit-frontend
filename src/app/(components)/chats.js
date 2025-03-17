'use client'

import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '@/app/(context)/context'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { redirect } from 'next/navigation'
import Layout from './layout'

const Chats = () => {
  const [chats, setChats] = useState([])
  const [filteredChats, setFilteredChats] = useState([])
  const { setChat } = useContext(ChatContext)

  const [search, setSearch] = useState('')

  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)

  useEffect(() => {
    const getChats = async () => {
      const token = localStorage.getItem('token')

      const response = await fetch(`${process.env.API_URL}/chats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const json = await response.json()
        setChats(json.chats ?? [])
      }
    }

    getChats()
  }, [])

  const handleClick = (event) => {
    setAnchorMenu(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorMenu(null)
  }

  const logout = () => {
    localStorage.clear('token')
    redirect('/login')
  }

  const filterChats = (evt) => {
    setSearch(evt.target.value)
    const filtered = chats.filter((chat) =>
      chat.name.includes(evt.target.value)
    )
    setFilteredChats(filtered)
  }

  return (
    <Layout>
      <header className='flex flex-col gap-2 sticky top-0 p-4'>
        <span className='flex mb-4 justify-between'>
          <h3 className='text-3xl'>Chats</h3>
          {/* <img src='#New Chat' className='ml-auto' /> */}
          <IconButton onClick={handleClick} style={{ color: 'white' }}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorMenu} open={openMenu} onClose={handleClose}>
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
          </Menu>
        </span>

        <input
          id='username'
          placeholder='Buscar'
          className='bg-white rounded text-black py-1 px-3'
          value={search}
          onChange={filterChats}
          required
        />

        <span className='flex mb-1'>
          {/* <img src='#Todos' /> */}
          {/* <img src='#No Leídos' /> */}
          {/* <img src='#Favoritos' /> */}
          {/* <img src='#Grupos' /> */}
        </span>
      </header>

      {filteredChats?.map((chat) => (
        <span
          key={chat.id}
          className='border-y-[2px] border-white/20 h-[100px] flex items-center hover:bg-white/10 cursor-pointer'
          onClick={() => setChat(chat)}
        >
          <img
            src='#user-picure'
            className='w-[80px] h-[80px] rounded-[50%] border mr-3'
          />
          <span>
            <h5 className='text-2xl'>{chat.name}</h5>
            <p className='text-gray-400'>{chat.lastMessage}</p>
          </span>
          {/* Date */}
          {/* <img src='#Mute' className='absolute right-0' /> */}
          {/* Config */}
        </span>
      ))}
    </Layout>
  )
}

export default Chats
