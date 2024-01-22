import ArticleShort from '../ArticleShort'
import './ArticlesList.scss'

const ArticlesList = ({ articles }) => {
  return (
    <div className="articles-list">
      {articles.map(({ slug }) => {
        return <ArticleShort key={slug} slug={slug} />
      })}
    </div>
  )
}

export default ArticlesList
