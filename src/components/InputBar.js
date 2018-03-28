import React from 'react'
import './InputBar.css'

const defaultLeftIcon = {
  backgroundColor: '#22252A',
  color: '#eee',
  text: '?'
}

const defaultSubmitIcon = {
  backgroundColor: '#eee',
  color: '#08b',
  text: '>'
}

export default ({
  value,
  placeholder = '',
  onChange,
  onFocus,
  onBlur,

  leftIcon = defaultLeftIcon,

  submitIcon = defaultSubmitIcon,
  onSubmit,

  isIlluminated
}) => (
  <div className={'InputBar ' + (isIlluminated ? ' InputBar-illuminated' : '')}>
    {(leftIcon !== null) &&
      <div className="InputBar-icon InputBar-left-icon" style={{
        backgroundColor: leftIcon.backgroundColor || defaultLeftIcon.backgroundColor,
        color: leftIcon.color || defaultLeftIcon.color
      }}>
        {leftIcon.text || defaultLeftIcon.text}
      </div>
    }

    <textarea
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    ></textarea>

    <div className="InputBar-icon InputBar-submit-icon" onClick={onSubmit} style={{
      backgroundColor: submitIcon.backgroundColor || defaultSubmitIcon.backgroundColor,
      color: submitIcon.color || defaultSubmitIcon.color
    }}>
      {submitIcon.text || defaultSubmitIcon.text}
    </div>
  </div>
)
