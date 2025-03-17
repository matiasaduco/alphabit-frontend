'use client'
import { Button, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [user, setUser] = useState({
    username: null,
    email: null,
    password: null,
  })
  const router = useRouter()

  async function handleSubmit() {
    const response = await fetch(`${process.env.API_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    if (response.ok) router.push('/')
  }

  return (
    <div className='h-screen relative'>
      <div className='flex flex-col justify-center items-center gap-4 w-[600px] h-[500px] p-10 bg-white rounded-lg shadow-2xl absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'>
        <TextField id='username' className='w-full' label='Usuario' required />
        <TextField
          id='email'
          className='w-full'
          label='Correo electrónico'
          required
        />
        <TextField
          id='password'
          className='w-full'
          type='password'
          label='Contraseña'
          required
        />
        <TextField
          id='confirm_password'
          className='w-full'
          type='confirm_password'
          label='Confirmar Contraseña'
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
