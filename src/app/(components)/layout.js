'use client'

import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { redirect } from 'next/navigation'
import { useState } from 'react'

const Layout = ({ children, header, setValue }) => {
  const [anchorMenu, setAnchorMenu] = useState(null)
  const openMenu = Boolean(anchorMenu)

  const handleClick = ({ currentTarget }) => {
    setAnchorMenu(currentTarget)
  }

  const handleClose = () => {
    setAnchorMenu(null)
  }

  const logout = () => {
    localStorage.clear('token')
    localStorage.clear('userId')
    redirect('/login')
  }

  const filter = ({ target }) => {
    setValue(target.value)
  }

  return (
    <aside className='bg-black/40 w-[500px] flex flex-col relative overflow-y-auto'>
      <header className='flex flex-col gap-2 sticky top-0 p-4'>
        <span className='flex mb-4 justify-between'>
          <h3 className='text-3xl'>{header}</h3>
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
          onChange={filter}
          required
        />

        <span className='flex mb-1'>
          {/* <img src='#Todos' /> */}
          {/* <img src='#No Leídos' /> */}
          {/* <img src='#Favoritos' /> */}
          {/* <img src='#Grupos' /> */}
        </span>
      </header>
      {children}
    </aside>
  )
}

export default Layout
