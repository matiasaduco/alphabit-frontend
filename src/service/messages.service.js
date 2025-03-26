export const sendMessage = (receiverId, text) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages`, {
    method: 'POST',
    body: JSON.stringify({ receiverId, text }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const getAllMessagesByUserId = (userId, page) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages?id=${userId}&page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const deleteMessage = (messageId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const getAllChats = async () => {
  const token = localStorage.getItem('token')

  return await fetch(`${process.env.API_URL}/messages/chats?page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const deleteChat = (userId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/chats?id=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}
