'use client'

import { Chat, People } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const SideBar = ({ value, setValue }) => {
  return (
    <aside className='w-[70px] flex flex-col items-center bg-[#2f3136]'>
      <IconButton
        onClick={() => setValue(0)}
        style={{
          color: 'white',
          marginTop: '17px',
          backgroundColor: value === 0 ? 'gray' : 'transparent',
        }}
      >
        <Chat />
      </IconButton>
      <IconButton
        onClick={() => setValue(1)}
        style={{
          color: 'white',
          backgroundColor: value === 1 ? 'gray' : 'transparent',
        }}
      >
        <People />
      </IconButton>
    </aside>
  )
}

export default SideBar
