import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import FormItem from '../../components/FormItem'
import { fetchUserRegister } from '../../store/slices/userSlice'
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
  requireValidation,
} from '../../utils/validationFormFields'
import { useAuth } from '../../hooks/useAuth'
import './Register.scss'

const Register = () => {
  const dispatch = useDispatch()
  const { isAuth } = useAuth()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { agree: true },
  })

  const onSubmit = (data) => {
    dispatch(fetchUserRegister({ data, setError, reset }))
  }

  const usernameInput = {
    id: 'username',
    label: 'Username',
    placeholder: 'Username',
    validation: { ...register('username', usernameValidation()) },
  }

  const emailInput = {
    id: 'email',
    label: 'Email address',
    placeholder: 'Email address',
    validation: { ...register('email', emailValidation()) },
  }

  const passwordInput = {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    validation: { ...register('password', passwordValidation()) },
  }

  const passwordRepeatInput = {
    id: 'passwordRepeat',
    type: 'password',
    label: 'Repeat Password',
    placeholder: 'Password',
    validation: { ...register('passwordRepeat', passwordValidation(watch)) },
  }

  const agreeCheckbox = {
    id: 'agree',
    type: 'checkbox',
    label: 'I agree to the processing of my personal information',
    validation: { ...register('agree', requireValidation) },
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="form">
      <h2 className="form__header">Create new account</h2>
      <form className="form__tag" onSubmit={handleSubmit(onSubmit)}>
        <FormItem {...usernameInput} errors={errors} />
        <FormItem {...emailInput} errors={errors} />
        <FormItem {...passwordInput} errors={errors} />
        <FormItem {...passwordRepeatInput} errors={errors} />
        <FormItem {...agreeCheckbox} errors={errors} />
        <button type="submit" className="form__btn-submit">
          Create
        </button>
      </form>
      <p className="form__has-account">
        Already have an account?
        <Link to="/sign-in" style={{ color: '#1890FF' }}>
          {' '}
          Sign In.
        </Link>
      </p>
    </div>
  )
}
export default Register
