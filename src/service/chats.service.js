export const getChatByContactId = (contactId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/chats/contact?id=${contactId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const getAllChats = async () => {
  const token = localStorage.getItem('token')

  return await fetch(`${process.env.API_URL}/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}
