export const getAllChats = async () => {
  const token = localStorage.getItem('token')

  return await fetch(`${process.env.API_URL}/chats?page=1`, {
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

  return fetch(`${process.env.API_URL}/chats?userId=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    mode: 'cors',
  })
}
