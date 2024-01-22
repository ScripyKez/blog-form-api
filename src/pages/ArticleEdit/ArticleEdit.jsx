import './ArticleEdit.scss'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { Alert, Space } from 'antd'

import ArticleForm from '../../components/ArticleForm'
import { useAuth } from '../../hooks/useAuth'
import { fetchEditArticle, fetchGetArticle } from '../../store/slices/articleSlice'

const ArticleEdit = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { token, username } = useAuth()
  const article = useSelector((state) => state.articles.article)
  const status = useSelector((state) => state.articles.status)

  useEffect(() => {
    dispatch(fetchGetArticle(slug))
  }, [dispatch, slug])

  const onSubmit = (data, setError) => {
    const { title, description, text, tagList } = data
    const getTags = (tags) => tags.map((tag) => tag.tag.trim()).filter((tag) => tag)

    const updateArticle = {
      article: {
        title,
        description,
        body: text,
        tagList: getTags(tagList),
      },
    }
    dispatch(fetchEditArticle({ updateArticle, token, slug, setError }))
  }
  if (status === 'updated') {
    return <Navigate to="/articles" />
  }
  if (status === 'resolved' && username !== article.author.username) {
    return (
      <div className="error-box">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message="Warning"
            description="You cannot edit this article because you are not its author."
            type="warning"
            showIcon
            closable
          />
        </Space>
      </div>
    )
  }
  return !!article && <ArticleForm onSubmit={onSubmit} articleData={article} header="Edit article" />
}

export default ArticleEdit
