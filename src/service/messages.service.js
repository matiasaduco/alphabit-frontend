export const sendMessage = (text, receiverId, responseToId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages`, {
    method: 'POST',
    body: JSON.stringify({ text, receiverId, responseToId }),
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
