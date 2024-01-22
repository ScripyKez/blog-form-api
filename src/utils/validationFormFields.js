export const requireValidation = {
  required: 'Required field',
}

export const noEmptyValidation = {
  pattern: {
    value: /^[^\s]+(?:$|.*[^\s]+$)/,
    message: 'Entered value cant start/end or contain only white spacing',
  },
}

export const usernameValidation = () => {
  return {
    ...requireValidation,
    ...noEmptyValidation,
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters.',
    },
    maxLength: {
      value: 20,
      message: 'Your username must contain no more than 20 characters.',
    },
  }
}

export const emailValidation = () => {
  return {
    ...requireValidation,
    pattern: {
      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: 'Please enter a valid email address',
    },
  }
}

export const profilePasswordValidation = () => {
  return {
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'Your password must contain no more than 40 characters.',
    },
  }
}

export const passwordValidation = (watch) => {
  const valObj = {
    ...requireValidation,
    ...profilePasswordValidation(),
  }
  if (watch) {
    valObj.validate = (val) => {
      if (watch('password') !== val) {
        return 'Your passwords do no match'
      }
    }
  }
  return valObj
}

export const imageValidation = () => {
  return {
    pattern: {
      value:
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      message: 'Please enter a valid url',
    },
  }
}

export const titleValidation = () => {
  return {
    ...requireValidation,
    maxLength: {
      value: 5000,
      message: 'Your title must contain no more than 5000 characters.',
    },
  }
}

export const textValidation = () => {
  return {
    ...requireValidation,
  }
}

export const tagValidation = () => {
  return {
    maxLength: {
      value: 20,
      message: 'Your tag must contain no more than 20 characters.',
    },
  }
}
