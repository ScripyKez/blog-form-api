import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import FormItem from '../../components/FormItem'
import { fetchUserLogin } from '../../store/slices/userSlice'
import { emailValidation, passwordValidation } from '../../utils/validationFormFields'
import { useAuth } from '../../hooks/useAuth'
import './SignIn.scss'

const SignIn = () => {
  const { isAuth } = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    dispatch(fetchUserLogin({ data, setError, reset }))
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

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <div className="form">
      <h2 className="form__header">Sign In</h2>
      <form className="form__tag" onSubmit={handleSubmit(onSubmit)}>
        <FormItem {...emailInput} errors={errors} />
        <FormItem {...passwordInput} errors={errors} />
        <button type="submit" className="form__btn-submit">
          Login
        </button>
      </form>
      <p className="form__has-account">
        Don’t have an account?
        <Link to="/sign-up" style={{ color: '#1890FF' }}>
          {' '}
          Sign Up.
        </Link>
      </p>
    </div>
  )
}

export default SignIn
