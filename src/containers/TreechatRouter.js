import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import LoadingScreen from './LoadingScreen'
import ConversationSelector from './ConversationSelector'

const mapStateToProps = state => {
  return {
    authState: state.authState,
    conversationContents: state.conversationContents
  }
}

const TreechatRouter = ({ authState, conversationContents }) => {
  if (!authState.isKnown) {
    return <LoadingScreen />
  }
  if (!authState.isLoggedIn) {
    return <Login />
  }
  if (null === conversationContents) {
    return <ConversationSelector />
  }
  return <p>Conversation goes here.</p>
}

export default connect(mapStateToProps, null)(TreechatRouter)
