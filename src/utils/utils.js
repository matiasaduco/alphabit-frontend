export const parseTime = (time) => {
  const hours = time.split('T')[1].split('.')[0].split(':')[0]
  const minutes = time.split('T')[1].split('.')[0].split(':')[1]

  return `${hours}:${minutes}`
}
