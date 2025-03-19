export const signIn = (user) => {
  return fetch(`${process.env.API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
    mode: 'cors',
  })
}

export const signUp = (user) => {
  return fetch(`${process.env.API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
    mode: 'cors',
  })
}
