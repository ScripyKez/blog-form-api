import uniqid from 'uniqid'
import format from 'date-fns/format'
import { Popconfirm } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAuth } from '../../hooks/useAuth'
import { fetchDeleteArticle, fetchFavoriteArticle, fetchUnfavoriteArticle } from '../../store/slices/articleSlice'

import './ArticleBase.scss'
import avatar from './avatar.svg'

const ArticleBase = (props) => {
  const dispatch = useDispatch()
  const { isAuth, username, token } = useAuth()
  const { author, createdAt, description, favorited, favoritesCount, tagList, title, body, slug, full } = props
  const [imgSrc, setImgSrc] = useState(author ? author.image : undefined)
  const favoriteArticles = JSON.parse(localStorage.getItem(`${username}FavoriteArticles`))
  const [favor, setFavor] = useState(favoriteArticles ? favoriteArticles.includes(slug) : favorited)
  const [favorCount, setFavorCount] = useState(favoritesCount)

  useEffect(() => {
    setImgSrc(author ? author.image : undefined)
  }, [author?.image, author])

  const confirm = () => {
    dispatch(fetchDeleteArticle({ slug, token }))
  }

  const favorite = () => {
    if (isAuth) {
      dispatch(fetchFavoriteArticle({ slug, token }))
      setFavor(true)
      setFavorCount(favorCount + 1)
      const favoriteArticle = JSON.parse(localStorage.getItem(`${username}FavoriteArticles`))
      if (favoriteArticle && !favoriteArticle.includes(slug)) {
        favoriteArticle.push(slug)
        localStorage.setItem(`${username}FavoriteArticles`, JSON.stringify(favoriteArticle))
      }
    }
  }

  const unfavorite = () => {
    if (isAuth) {
      dispatch(fetchUnfavoriteArticle({ slug, token }))
      setFavor(false)
      setFavorCount(favorCount - 1)
      const favoriteArticle = JSON.parse(localStorage.getItem(`${username}FavoriteArticles`))
      if (favoriteArticle) {
        const newfavoriteArticle = favoriteArticle.filter((s) => s !== slug)
        localStorage.setItem(`${username}FavoriteArticles`, JSON.stringify(newfavoriteArticle))
      }
    }
  }

  return (
    <div className="article">
      <div className="article__box">
        <div className="article__content">
          <div className="article__heading">
            <div className="article__top">
              <h2 className="article__title">
                <Link to={`/articles/${slug}`}>{title}</Link>
              </h2>
              {favor ? (
                <span className="article__favorite" onClick={unfavorite} role="button" tabIndex="0">
                  <HeartFilled style={{ color: '#FF0707' }} />
                </span>
              ) : (
                <span className="article__favorite" onClick={favorite} role="button" tabIndex="0">
                  <HeartOutlined style={{ color: 'rgba(0, 0, 0, 0.75)' }} />
                </span>
              )}
              <span className="article__favorite">{favorCount}</span>
            </div>
            <div className="tags">
              {!!tagList &&
                tagList.map((tag) => (
                  <span key={uniqid('tag-')} className="tag">
                    {tag}
                  </span>
                ))}
            </div>
            <div className="article__description">{description}</div>
          </div>
          <div>
            <div className="article__author">
              <div className="article__info">
                <p className="article__name">{author?.username}</p>
                <p className="article__date">{createdAt ? format(new Date(createdAt), 'MMMM d, y') : 'unknown'}</p>
              </div>
              <img className="article__img" src={imgSrc} onError={() => setImgSrc(avatar)} alt="avatar" />
            </div>
            {isAuth && username === author?.username && full && (
              <div className="article__btn-box">
                <Popconfirm
                  description="Are you sure to delete this article?"
                  onConfirm={() => confirm(slug)}
                  okText="Yes"
                  cancelText="No"
                >
                  <button type="button" className="article__btn red-style">
                    Delete
                  </button>
                </Popconfirm>
                <Link to={`/articles/${slug}/edit`} className="article__btn green-style">
                  Edit
                </Link>
              </div>
            )}
          </div>
        </div>
        {!!body && (
          <div className="article__body">
            <Markdown>{body}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleBase
