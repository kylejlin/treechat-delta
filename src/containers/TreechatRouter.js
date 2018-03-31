import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import JoinPage from './JoinPage'
import LoadingScreen from './LoadingScreen'
import ConversationSelector from './ConversationSelector'
import MemberMenu from './MemberMenu'
import ConversationWithdrawalConfirmation from './ConversationWithdrawalConfirmation'
import Conversation from './Conversation'

const mapStateToProps = state => {
  return {
    authState: state.authState,
    ownIdentity: state.ownIdentity,
    conversationContents: state.conversationContents,
    memberMenu: state.memberMenu,
    isConfirmingWithdrawal: state.uiState.isConfirmingWithdrawal
  }
}

const TreechatRouter = ({ authState, ownIdentity, conversationContents, memberMenu, isConfirmingWithdrawal }) => {
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
    if (memberMenu) {
      return <MemberMenu />
    }
    if (isConfirmingWithdrawal) {
      return <ConversationWithdrawalConfirmation />
    }
    return <ConversationSelector />
  }
  return <Conversation />
}

export default connect(mapStateToProps, null)(TreechatRouter)
