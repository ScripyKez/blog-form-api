import './FormItem.scss'

const FormItem = ({ id, type, label, placeholder, classNames, validation, errors, remove, index, fields, append }) => {
  if (type === 'checkbox') {
    return (
      <>
        <div className="form__agree">
          <input id={id} type={type} className={`form__checkbox ${classNames?.input || ''}`} {...validation} />
          <label htmlFor={id} className={`form__agree-label ${classNames?.label || ''}`}>
            {label}
          </label>
        </div>
        {errors?.[id] && (
          <div className="form__error">
            <p>{errors?.[id]?.message || 'Error!'}</p>
          </div>
        )}
      </>
    )
  }
  if (type === 'textarea') {
    return (
      <>
        <label htmlFor={id} className={`form__label ${classNames?.label || ''}`}>
          {label}
        </label>
        <textarea
          id={id}
          className={`form__textarea ${errors?.[id] ? 'form__textarea-invalid' : ''} ${classNames?.input || ''}`}
          cols="30"
          rows="7"
          placeholder={placeholder}
          {...validation}
        />
        {errors?.[id] && (
          <div className="form__error">
            <p>{errors?.[id]?.message || 'Error!'}</p>
          </div>
        )}
      </>
    )
  }
  if (type === 'tag') {
    return (
      <>
        <div className="form__tag-wrapper">
          <input
            type="text"
            className={`form__input-tag ${errors?.tagList?.[index] ? 'form__input-tag-invalid' : ''} ${
              classNames?.input || ''
            }`}
            placeholder={placeholder}
            {...validation}
          />
          <button type="button" className="form__btn-delete" onClick={() => remove(index)}>
            Delete
          </button>
          {fields.length - 1 === index && (
            <button type="button" className="form__btn-add" onClick={() => append({ tag: '' })}>
              Add tag
            </button>
          )}
        </div>
        {errors?.tagList?.[index]?.tag && (
          <div className="form__error">
            <p>{errors?.tagList?.[index]?.tag?.message || 'Error!'}</p>
          </div>
        )}
      </>
    )
  }
  return (
    <>
      <label htmlFor={id} className={`form__label ${classNames?.label || ''}`}>
        {label}
      </label>
      <input
        id={id}
        type={type || 'text'}
        className={`form__input ${errors?.[id] ? 'form__input-invalid' : ''} ${classNames?.input || ''}`}
        placeholder={placeholder}
        {...validation}
      />
      {errors?.[id] && (
        <div className="form__error">
          <p>{errors?.[id]?.message || 'Error!'}</p>
        </div>
      )}
    </>
  )
}

export default FormItem
