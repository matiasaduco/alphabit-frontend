'use client'

import { signUp } from '@/service/auth.service'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

export default function LoginPage() {
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
    confirm_password: null,
  })
  const router = useRouter()

  useLayoutEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  async function handleSubmit() {
    if (user.password !== user.confirm_password) {
      alert('Las contraseñas no coinciden.')
      return
    }

    const response = await signUp(user)

    if (response.ok) {
      const json = await response.json()
      localStorage.setItem('token', json.token)
      localStorage.setItem('userId', json.payload.id)
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
          id='email'
          className='w-full'
          label='Correo electrónico'
          onChange={(evt) => setUser({ ...user, email: evt.target.value })}
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
        <TextField
          id='confirm_password'
          className='w-full'
          type='password'
          label='Confirmar Contraseña'
          onChange={(evt) =>
            setUser({ ...user, confirm_password: evt.target.value })
          }
          required
        />
        <Button className='w-full' variant='contained' onClick={handleSubmit}>
          Crear Cuenta
        </Button>
        <span className='text-black'>
          Ya tienes una cuenta?{' '}
          <Link href={'/login'} className='underline'>
            Iniciar Sesión
          </Link>
        </span>
      </div>
    </div>
  )
}
