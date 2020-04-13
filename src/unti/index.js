export function getRedirectTo(type, avatar) {
  let path = ''
  if (type === 'laoban') {
    path = '/boss'
  } else {
    path = '/staff'
  }
  if (!avatar) {
    path = path + 'Info'
  }
  return path
}