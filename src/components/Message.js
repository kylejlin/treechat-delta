import React from 'react'
import './Message.css'

const formatTimestamp = date => {
  const MONTHS = 'January February March April May June July August September October November December'.split(' ')
  const seconds = date.getSeconds()
  const paddedSeconds = seconds >= 10
    ? seconds
    : '0' + seconds
  return date.getDay()
    + ' '
    + MONTHS[date.getMonth()]
    + ' '
    + (date.getYear() + 1900)
    + ' - '
    + date.getHours()
    + ':'
    + date.getMinutes()
    + ':'
    + paddedSeconds
}

export default ({ text, authorDisplayName, timestamp, theme, onClick, icon, isIlluminated = false }) => (
  <div className={'Message Treechat-theme-' + theme + (isIlluminated ? ' Message-illuminated' : '')} onClick={onClick}>
    <div className="Message-icon">
      {icon}
    </div>
    {text}
    <div className="Message-metadata">
      {authorDisplayName} - {formatTimestamp(timestamp)}
    </div>
  </div>
)
