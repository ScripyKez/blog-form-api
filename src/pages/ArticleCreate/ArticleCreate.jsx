import './ArticleCreate.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import ArticleForm from '../../components/ArticleForm'
import { useAuth } from '../../hooks/useAuth'
import { fetchCreateArticle } from '../../store/slices/articleSlice'

const ArticleCreate = () => {
  const dispatch = useDispatch()
  const { isAuth, token } = useAuth()
  const status = useSelector((state) => state.articles.status)

  const onSubmit = (data, setError) => {
    const { title, description, text, tagList } = data

    const getTags = (tags) => tags.map((tag) => tag.tag.trim()).filter((tag) => tag)

    const newArticle = {
      article: {
        title,
        description,
        body: text,
        tagList: getTags(tagList),
      },
    }
    dispatch(fetchCreateArticle({ newArticle, token, setError }))
  }
  if (!isAuth) {
    return <Navigate to="/sign-in" />
  }
  if (status === 'created') {
    return <Navigate to="/articles" />
  }
  return <ArticleForm onSubmit={onSubmit} header="Create new article" />
}

export default ArticleCreate
