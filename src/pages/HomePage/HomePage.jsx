import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'

import { fetchArticles, setPageNumber } from '../../store/slices/articleSlice'
import { PAGE_SIZE } from '../../constants'
import ArticlesList from '../../components/ArticlesList'
import Preloader from '../../components/Preloader'
import ErrorMessage from '../../components/ErrorMessage'

const HomePage = () => {
  const pageNumber = useSelector((state) => state.articles.page)
  const articles = useSelector((state) => state.articles.articles)
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const status = useSelector((state) => state.articles.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles(pageNumber))
    window.scrollTo({ top: 0 })
  }, [pageNumber, dispatch])

  return (
    <>
      {status === 'loading' && <Preloader />}
      {status === 'resolved' && (
        <>
          <ArticlesList articles={articles} />
          <div className="pagination">
            <Pagination
              current={pageNumber}
              defaultPageSize={PAGE_SIZE}
              total={articlesCount}
              onChange={(page) => dispatch(setPageNumber(page))}
            />
          </div>
        </>
      )}
      {status === 'rejected' && <ErrorMessage />}
    </>
  )
}

export default HomePage
