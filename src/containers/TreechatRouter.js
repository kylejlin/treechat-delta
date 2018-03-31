import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import JoinPage from './JoinPage'
import LoadingScreen from './LoadingScreen'
import ConversationSelector from './ConversationSelector'
import Conversation from './Conversation'

const mapStateToProps = state => {
  return {
    authState: state.authState,
    ownIdentity: state.ownIdentity,
    conversationContents: state.conversationContents
  }
}

const TreechatRouter = ({ authState, ownIdentity, conversationContents }) => {
  if (!authState.isKnown) {
    return <LoadingScreen />
  }
  if (!authState.isLoggedIn) {
    if (ownIdentity.uid) {
      return <JoinPage />
    }
    return <Login />
  }
  if (null === conversationContents) {
    return <ConversationSelector />
  }
  return <Conversation />
}

export default connect(mapStateToProps, null)(TreechatRouter)
