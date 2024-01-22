import { Alert, Space } from 'antd'
import { useSelector } from 'react-redux'
import './ErrorMessage.scss'

const ErrorMessage = () => {
  const error = useSelector((state) => state.articles.error)
  return (
    <div className="error-box">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert message="Error" description={`something has gone terribly wrong: ${error}`} type="error" closable />
      </Space>
    </div>
  )
}

export default ErrorMessage
