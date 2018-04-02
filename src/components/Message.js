import React from 'react'
import './Message.css'

export default ({ text, theme, onClick, icon, isIlluminated = false }) => (
  <div className={'Message Treechat-theme-' + theme + (isIlluminated ? ' Message-illuminated' : '')} onClick={onClick}>
    <div className="Message-icon">
      {icon}
    </div>
    {text}
  </div>
)
