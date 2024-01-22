import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../Header'
import ArticleFull from '../../pages/ArticleFull'
import HomePage from '../../pages/HomePage'
import SignIn from '../../pages/SignIn'
import Register from '../../pages/Register'
import Profile from '../../pages/Profile'
import ArticleCreate from '../../pages/ArticleCreate'
import ArticleEdit from '../../pages/ArticleEdit'
import PageNotFound from '../../pages/PageNotFound'
import { setUser } from '../../store/slices/userSlice'
import './App.scss'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      dispatch(setUser(JSON.parse(user)))
    }
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/articles?" element={<HomePage />} />
          <Route path="/articles/:slug" element={<ArticleFull />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-article" element={<ArticleCreate />} />
          <Route path="/articles/:slug/edit" element={<ArticleEdit />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
