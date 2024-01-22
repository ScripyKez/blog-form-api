import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { BASE_URL, PAGE_SIZE } from '../../constants'

const makeRequest = async (url, method, token, body) => {
  let init = {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  init = body ? { ...init, body } : init
  let response
  if (method === 'GET') {
    response = await fetch(`${url}`)
  } else {
    response = await fetch(`${url}`, init)
  }
  if (!response.ok && response.status !== 422) {
    throw new Error(`Error fetching data. status: ${response.status}`)
  }
  if (method === 'DELETE') return
  const result = await response.json()
  return result
}

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async function (page, { rejectWithValue }) {
  const offset = (page - 1) * PAGE_SIZE
  try {
    const data = await makeRequest(`${BASE_URL}articles?limit=${PAGE_SIZE}&offset=${offset}`, 'GET')
    return { data, page }
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchGetArticle = createAsyncThunk('articles/fetchGetArticle', async function (slug, { rejectWithValue }) {
  try {
    return await makeRequest(`${BASE_URL}articles/${slug}`, 'GET')
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async function (data, { rejectWithValue }) {
    const { newArticle, token, setError } = data
    try {
      const res = await makeRequest(`${BASE_URL}articles`, 'POST', token, JSON.stringify(newArticle))
      if (res?.errors) {
        Object.keys(res?.errors).map((error) => setError(error, { message: res?.errors[error] }))
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async function (data, { rejectWithValue }) {
    const { updateArticle, token, slug, setError } = data
    try {
      const res = await makeRequest(`${BASE_URL}articles/${slug}`, 'PUT', token, JSON.stringify(updateArticle))
      if (res?.errors) {
        Object.keys(res?.errors).map((error) => setError(error, { message: res?.errors[error] }))
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',
  async function (data, { rejectWithValue }) {
    const { slug, token } = data
    try {
      await makeRequest(`${BASE_URL}articles/${slug}`, 'DELETE', token)
      return slug
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchFavoriteArticle = createAsyncThunk(
  'articles/fetchFavoriteArticle',
  async function (data, { rejectWithValue }) {
    const { slug, token } = data
    try {
      return await makeRequest(`${BASE_URL}articles/${slug}/favorite`, 'POST', token)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchUnfavoriteArticle = createAsyncThunk(
  'articles/fetchUnfavoriteArticle',
  async function (data, { rejectWithValue }) {
    const { slug, token } = data
    try {
      return await makeRequest(`${BASE_URL}articles/${slug}/favorite`, 'DELETE', token)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

const setLoading = (state) => {
  state.status = 'loading'
  state.error = null
}

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    article: null,
    page: 1,
    articles: [],
    articlesCount: 0,
    status: null,
    error: null,
  },
  reducers: {
    setPageNumber(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, setLoading)
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.articles = action.payload.data.articles
        state.articlesCount = action.payload.data.articlesCount
        state.page = action.payload.page
      })
      .addCase(fetchArticles.rejected, setError)

      .addCase(fetchGetArticle.pending, setLoading)
      .addCase(fetchGetArticle.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.article = action.payload.article
      })
      .addCase(fetchGetArticle.rejected, setError)

      .addCase(fetchCreateArticle.pending, setLoading)
      .addCase(fetchCreateArticle.fulfilled, (state) => {
        state.status = 'created'
      })

      .addCase(fetchEditArticle.pending, setLoading)
      .addCase(fetchEditArticle.fulfilled, (state) => {
        state.status = 'updated'
      })

      .addCase(fetchDeleteArticle.pending, setLoading)
      .addCase(fetchDeleteArticle.fulfilled, (state, action) => {
        state.articles.filter((article) => article.slug !== action.payload)
        state.status = 'deleted'
      })
  },
})

export const { setPageNumber } = articleSlice.actions
export default articleSlice.reducer
