export const getChatByContactId = (contactId) => {
  const token = localStorage.getItem('token')

  return fetch(`${process.env.API_URL}/chats?contact=${contactId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
