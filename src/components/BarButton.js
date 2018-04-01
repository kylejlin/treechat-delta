import React from 'react'
import './BarButton.css'

const defaultIcon = {
  backgroundColor: 'none',
  color: 'none',
  text: '?'
}

export default ({ text, theme, onClick, icon = defaultIcon, isIlluminated = false }) => (
  <div className={'BarButton Treechat-theme-' + theme + (isIlluminated ? ' BarButton-illuminated' : '')} onClick={onClick}>
    <div className="BarButton-icon" style={{
      backgroundColor: icon.backgroundColor || defaultIcon.backgroundColor,
      color: icon.color || defaultIcon.color
    }}>
      {icon.text || defaultIcon.text}
    </div>
    {text}
  </div>
)
