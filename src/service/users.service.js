export const getUserContacts = () => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })

  return fetch(`${process.env.API_URL}/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}
