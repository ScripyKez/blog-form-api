import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchGetArticle } from '../../store/slices/articleSlice'
import ArticleBase from '../../components/ArticleBase'
import Preloader from '../../components/Preloader'
import ErrorMessage from '../../components/ErrorMessage'
import './ArticleFull.scss'

const ArticleFull = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const article = useSelector((state) => state.articles.article)
  const status = useSelector((state) => state.articles.status)

  useEffect(() => {
    dispatch(fetchGetArticle(slug))
  }, [dispatch, slug])

  if (status === 'deleted') {
    return <Navigate to="/articles" />
  }
  return (
    <>
      {status === 'loading' && <Preloader />}
      {status === 'resolved' && <ArticleBase {...article} full />}
      {status === 'rejected' && <ErrorMessage />}
    </>
  )
}

export default ArticleFull
