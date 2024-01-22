import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import FormItem from '../../components/FormItem'
import {
  usernameValidation,
  emailValidation,
  profilePasswordValidation,
  imageValidation,
} from '../../utils/validationFormFields'
import { useAuth } from '../../hooks/useAuth'
import { fetchUpdateProfile } from '../../store/slices/userSlice'
import './Profile.scss'

const Profile = () => {
  const dispatch = useDispatch()
  const { username, email, image, token } = useAuth()
  const updated = useSelector((state) => state.user.updated)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    setValue('username', username)
    setValue('email', email)
    setValue('image', image)
  }, [setValue, username, email, image])

  const onSubmit = (data) => {
    const profileInfo = Object.entries(data).reduce((acc, [k, v]) => (v ? { ...acc, [k]: v } : acc), {})
    dispatch(fetchUpdateProfile({ username, profileInfo, token, setError }))
  }

  const usernameInput = {
    id: 'username',
    label: 'Username',
    validation: { ...register('username', usernameValidation()) },
  }

  const emailInput = {
    id: 'email',
    label: 'Email address',
    validation: { ...register('email', emailValidation()) },
  }

  const passwordInput = {
    id: 'password',
    type: 'password',
    label: 'New password',
    placeholder: 'New password',
    validation: { ...register('password', profilePasswordValidation()) },
  }

  const imageInput = {
    id: 'image',
    label: 'Avatar image (url)',
    placeholder: 'Avatar image',
    validation: { ...register('image', imageValidation()) },
  }

  return (
    <>
      <div className="form">
        <h2 className="form__header">Edit Profile</h2>
        <form className="form__tag" onSubmit={handleSubmit(onSubmit)}>
          <FormItem {...usernameInput} errors={errors} />
          <FormItem {...emailInput} errors={errors} />
          <FormItem {...passwordInput} errors={errors} />
          <FormItem {...imageInput} errors={errors} />
          <button type="submit" className="form__btn-submit">
            Save
          </button>
        </form>
      </div>
      <div className="success-message">
        {updated && <Alert message="Profile has been successfully updated" type="success" />}
      </div>
    </>
  )
}

export default Profile
