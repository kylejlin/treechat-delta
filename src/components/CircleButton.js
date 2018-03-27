import React from 'react'
import './CircleButton.css'

const defaultIcon = {
  backgroundColor: '#22252A',
  color: '#eee',
  text: '?'
}

export default ({ icon, theme, onClick, isIlluminated = false }) => (
  <div
    onClick={onClick}
    className={'CircleButton Treechat-theme-' + theme + (isIlluminated ? ' CircleButton-illuminated' : '')}
    style={{
      backgroundColor: icon.backgroundColor,
      color: icon.color
    }}
  >
    {icon.text || defaultIcon.text}
  </div>
)
