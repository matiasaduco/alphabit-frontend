export const getMessagesByChatId = (chatId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/chats/${chatId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
