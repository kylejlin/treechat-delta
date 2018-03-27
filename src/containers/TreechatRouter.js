import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import LoadingScreen from './LoadingScreen'
import ConversationSelector from './ConversationSelector'

const mapStateToProps = state => {
  return {
    authState: state.authState,
    isAConversationFocused: state.fields.focusedConversation !== null
  }
}

const TreechatRouter = ({ authState, isAConversationFocused }) => {
  if (!authState.isKnown) {
    return <LoadingScreen />
  }
  if (!authState.isLoggedIn) {
    return <Login />
  }
  if (!isAConversationFocused) {
    return <ConversationSelector />
  }
  return <p>You're looking at a conversation mockcomp :)</p>
}

export default connect(mapStateToProps, null)(TreechatRouter)
