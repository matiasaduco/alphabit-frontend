import { Chat, Logout, People } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { redirect } from 'next/navigation'

const SideBar = ({ value, setValue }) => {
  const logout = () => {
    localStorage.clear('token')
    localStorage.clear('userId')
    redirect('/login')
  }

  return (
    <aside className='min-w-[45px] max-w-[90px] py-4 flex flex-col items-center bg-[#2f3136]'>
      <IconButton
        onClick={() => setValue(0)}
        style={{
          color: 'white',
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
      <IconButton
        onClick={logout}
        style={{ color: 'white', marginTop: 'auto' }}
      >
        <Logout />
      </IconButton>
    </aside>
  )
}

export default SideBar
