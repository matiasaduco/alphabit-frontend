export const getMessagesByChatId = (chatId, page) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/messages/${chatId}?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
  })
}
