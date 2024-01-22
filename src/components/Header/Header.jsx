import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useAuth } from '../../hooks/useAuth'
import { removeUser } from '../../store/slices/userSlice'
import './Header.scss'
import avatar from '../ArticleBase/avatar.svg'

const Header = () => {
  const dispatch = useDispatch()
  const { isAuth, username, image } = useAuth()
  const [imgSrc, setImgSrc] = useState(image)
  const navigate = useNavigate()

  useEffect(() => {
    setImgSrc(image || avatar)
  }, [image])

  const logOut = () => {
    dispatch(removeUser())
    navigate('/articles')
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/articles" className="header__btn">
            <p>Realworld Blog</p>
          </Link>
          <div className="header__btn-box">
            {isAuth ? (
              <>
                <Link to="/new-article" className="header__btn green-style small-style">
                  Create article
                </Link>
                <Link to="/profile" className="header__btn">
                  <span>{username}</span>
                  <img src={imgSrc} onError={() => setImgSrc(avatar)} alt="avatar" className="header__avatar" />
                </Link>
                <button type="button" className="header__btn grey-style" onClick={logOut}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="header__btn">
                  Sign In
                </Link>
                <Link to="/sign-up" className="header__btn green-style">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
