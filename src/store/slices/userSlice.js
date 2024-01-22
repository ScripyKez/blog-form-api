import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { BASE_URL } from '../../constants'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
    token: null,
    image: null,
    updated: false,
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
      state.image = action.payload.image
    },
    removeUser(state) {
      state.username = null
      state.email = null
      state.token = null
      state.image = null
      localStorage.removeItem('user')
    },
    setUpdateUser(state, action) {
      state.updated = action.payload
    },
  },
})

export const { setUser, removeUser, setUpdateUser } = userSlice.actions
export default userSlice.reducer

const makeRequest = async (url, method, token, body, message) => {
  const init = {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  }
  const response = await fetch(`${url}`, init)
  if (!response.ok && response.status !== 422) {
    throw new Error(`${message || 'Error fetching data.'} status: ${response.status}`)
  }
  const result = await response.json()
  return result
}

export const fetchUpdateProfile = createAsyncThunk(
  'user/fetchUpdateProfile',
  async function (data, { rejectWithValue, dispatch }) {
    const { username, profileInfo, token, setError } = data
    try {
      const res = await makeRequest(
        `${BASE_URL}user`,
        'PUT',
        token,
        JSON.stringify({ user: { ...profileInfo } }),
        'Cant update profile.'
      )
      if (res?.errors) {
        Object.keys(res?.errors).map((error) => setError(error, { message: res?.errors[error] }))
      } else {
        dispatch(setUser(res.user))
        localStorage.setItem('user', JSON.stringify(res.user))

        const favoriteArticles = JSON.parse(localStorage.getItem(`${username}FavoriteArticles`))
        localStorage.removeItem(`${username}FavoriteArticles`)
        localStorage.setItem(`${res.user.username}FavoriteArticles`, JSON.stringify(favoriteArticles))

        dispatch(setUpdateUser(true))
        setTimeout(() => dispatch(setUpdateUser(false)), 2000)
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchUserRegister = createAsyncThunk(
  'user/fetchUserRegister',
  async function (data, { rejectWithValue, dispatch }) {
    const { data: userInfo, setError, reset } = data
    const { username, email, password } = userInfo
    try {
      const body = JSON.stringify({
        user: {
          username,
          email: email.toLowerCase(),
          password,
        },
      })
      const res = await makeRequest(`${BASE_URL}users`, 'POST', undefined, body, 'Can`t register user.')
      if (res?.errors) {
        Object.keys(res?.errors).map((error) => setError(error, { message: res?.errors[error] }))
      } else {
        dispatch(setUser(res.user))
        reset()
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem(`${userInfo.username}FavoriteArticles`, JSON.stringify([]))
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchUserLogin = createAsyncThunk(
  'user/fetchUserLogin',
  async function (data, { rejectWithValue, dispatch }) {
    const { data: userInfo, setError, reset } = data
    try {
      const body = JSON.stringify({
        user: {
          email: userInfo.email.toLowerCase(),
          password: userInfo.password,
        },
      })
      const res = await makeRequest(`${BASE_URL}users/login`, 'POST', undefined, body, 'Can`t log in..')
      if (res?.errors) {
        setError('email', { message: 'email address or password is incorrect' })
        setError('password', { message: 'email address or password is incorrect' })
      } else {
        dispatch(setUser(res.user))
        reset()
        localStorage.setItem('user', JSON.stringify(res.user))
        const favoriteArticles = localStorage.getItem(`${res.user.username}FavoriteArticles`)
        if (!favoriteArticles) localStorage.setItem(`${res.user.username}FavoriteArticles`, JSON.stringify([]))
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
