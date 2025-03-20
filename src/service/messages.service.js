export const getMessagesByChatId = (chatId, page) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages/${chatId}?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const sendMessage = (chatId, message) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages/${chatId}`, {
    method: 'POST',
    body: JSON.stringify({ text: message }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}

export const deleteMessage = (chatId, messageId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages/${chatId}/${messageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}
