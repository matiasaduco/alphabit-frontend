'use client'

import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

export default function LoginPage() {
  const [user, setUser] = useState({
    username: null,
    password: null,
  })
  const router = useRouter()

  useLayoutEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  async function handleSubmit() {
    const response = await fetch(`${process.env.API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      const json = await response.json()
      localStorage.setItem('token', json.token)
      router.push('/')
    } else {
      if (response.status === 401) {
        alert('Usuario o contraseña incorrectos')
      }
    }
  }

  return (
    <div className='h-screen relative'>
      <div className='flex flex-col justify-center items-center gap-4 w-[600px] h-[500px] p-10 bg-white rounded-lg shadow-2xl absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'>
        <TextField
          id='username'
          className='w-full'
          label='Usuario'
          onChange={(evt) => setUser({ ...user, username: evt.target.value })}
          required
        />
        <TextField
          id='password'
          className='w-full'
          type='password'
          label='Contraseña'
          onChange={(evt) => setUser({ ...user, password: evt.target.value })}
          required
        />
        <Button className='w-full' variant='contained' onClick={handleSubmit}>
          Iniciar Sesión
        </Button>
        <span className='text-black'>
          No tienes una cuenta?{' '}
          <Link href={'/register'} className='underline'>
            Crear Cuenta
          </Link>
        </span>
      </div>
    </div>
  )
}
