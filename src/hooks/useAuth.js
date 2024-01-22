import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { username, token, email, image } = useSelector((state) => state.user)

  return {
    isAuth: !!username,
    username,
    token,
    email,
    image,
  }
}
