import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import './ArticleForm.scss'

import FormItem from '../FormItem'
import { titleValidation, tagValidation, textValidation } from '../../utils/validationFormFields'

const ArticleForm = ({ onSubmit, articleData, header }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tagList: [{ tag: '' }],
    },
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    if (articleData) {
      setValue('title', articleData.title)
      setValue('description', articleData.description)
      setValue('text', articleData.body)
      replace(articleData.tagList.map((t) => ({ tag: t })))
    }
  }, [articleData, setValue, replace])

  function checkData(data) {
    const { tagList, ...other } = data
    const emptyFields = Object.keys(other).filter((field) => other[field].trim() === '')
    if (emptyFields.length) {
      emptyFields.forEach((field) => setError(field, { message: 'Field should not be empty' }))
      return
    }
    const newOther = Object.keys(other).reduce((acc, field) => {
      acc[field] = other[field].trim()
      return acc
    }, {})
    const newData = { tagList, ...newOther }
    onSubmit(newData, setError, reset)
  }

  const titleInput = {
    id: 'title',
    label: 'Title',
    placeholder: 'Title',
    classNames: { input: 'article-title-margin' },
    validation: { ...register('title', titleValidation()) },
  }

  const descriptionInput = {
    id: 'description',
    label: 'Short description',
    placeholder: 'Title',
    validation: { ...register('description', textValidation()) },
  }

  const textInput = {
    id: 'text',
    type: 'textarea',
    label: 'Text',
    placeholder: 'Text',
    validation: { ...register('text', textValidation()) },
  }

  const tagInput = {
    type: 'tag',
    placeholder: 'Tag',
    remove,
    fields,
    append,
    errors,
  }

  return (
    <div className="form form-article">
      <h2 className="form__header">{header}</h2>
      <form className="form__tag" onSubmit={handleSubmit((data) => checkData(data))}>
        <FormItem {...titleInput} errors={errors} />
        <FormItem {...descriptionInput} errors={errors} />
        <FormItem {...textInput} errors={errors} />
        <div className="form__article-tags">
          <label className="form__label">Tags</label>
          <div className="form__article-tags-list">
            {fields.length > 0 ? (
              fields.map((field, index) => (
                <FormItem
                  key={field.id}
                  {...tagInput}
                  validation={{ ...register(`tagList.${index}.tag`, tagValidation()) }}
                  index={index}
                />
              ))
            ) : (
              <button type="button" className="form__btn-add" onClick={() => append({ tag: '' })}>
                Add tag
              </button>
            )}
          </div>
        </div>
        <button type="submit" className="form__btn-submit form__btn-submit-article">
          Send
        </button>
      </form>
    </div>
  )
}

export default ArticleForm
