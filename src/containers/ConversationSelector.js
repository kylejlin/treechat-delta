import React from 'react'
import { connect } from 'react-redux'

import './ConversationSelector.css'

import BarButton from '../components/BarButton'
import CircleButton from '../components/CircleButton'
import InputBar from '../components/InputBar'

import {
  unselectConversationAndUnconfirmSignOut,

  editNewConversationName,
  updateNewConversationNameInputFocus,
  createConversation,

  selectConversation,
  openSelectedConversation,
  confirmWithdrawalFromSelectedConversation,
  openSelectedConversationMemberMenu,

  confirmSignOut,
  actuallySignOut
} from '../store/actions'



const createBackgroundClickHandler = handler => {
  return e => {
    if (e.target.classList && e.target.classList.contains('Treechat-container')) {
      handler()
    }
  }
}



const mapStateToProps = state => {
  return {
    ownName: state.ownIdentity.name,
    conversationSummaries: state.conversationSummaries,
    newConversationName: state.fields.newConversationName,
    isNewConversationNameInputFocused: state.uiState.isNewConversationNameInputFocused,
    selectedConversation: state.fields.selectedConversation,
    isConfirmingSignOut: state.uiState.isConfirmingSignOut
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBackgroundClick: () => {
      dispatch(unselectConversationAndUnconfirmSignOut())
    },

    editNewConversationName: value => {
      dispatch(editNewConversationName(value))
    },
    updateNewConversationNameInputFocus: isFocused => {
      dispatch(updateNewConversationNameInputFocus(isFocused))
    },
    createConversation: () => {
      dispatch(createConversation())
    },

    selectConversation: conversationSummary => {
      dispatch(selectConversation(conversationSummary))
    },
    openSelectedConversation: () => {
      dispatch(openSelectedConversation())
    },
    confirmWithdrawalFromSelectedConversation: () => {
      dispatch(confirmWithdrawalFromSelectedConversation())
    },
    openSelectedConversationMemberMenu: () => {
      dispatch(openSelectedConversationMemberMenu())
    },

    confirmSignOut: () => {
      dispatch(confirmSignOut())
    },
    actuallySignOut: () => {
      dispatch(actuallySignOut())
    }
  }
}

const ConversationSelector = ({
  onBackgroundClick,

  ownName,

  conversationSummaries,

  newConversationName,
  editNewConversationName,
  isNewConversationNameInputFocused,
  updateNewConversationNameInputFocus,
  createConversation,

  selectedConversation,
  selectConversation,
  openSelectedConversation,
  confirmWithdrawalFromSelectedConversation,
  openSelectedConversationMemberMenu,

  /*invitee,
  editInvitee,
  addInvitee,
  */

  isConfirmingSignOut,
  confirmSignOut,
  actuallySignOut
}) => {
  return (
    <div className="Treechat ConversationSelector" onClick={createBackgroundClickHandler(onBackgroundClick)}>
      <div className="ConversationSelector-conversations-container Treechat-container Treechat-theme-green">
        <div className="Treechat-section-header">Conversations</div>
        {conversationSummaries.map((conversationSummary, i) => (
          <BarButton
            key={i}
            onClick={() => {selectConversation(conversationSummary)}}
            text={conversationSummary.rootText}
            icon={{
              text: '',
              color: '#22252A',
              backgroundColor: '#22252A'
            }}
            theme="white"
            isIlluminated={!isNewConversationNameInputFocused && conversationSummary === selectedConversation}
          />
        ))}
        <div>
          <InputBar
            value={newConversationName}
            placeholder="New conversation"
            onChange={editNewConversationName}
            onFocus={() => updateNewConversationNameInputFocus(true)}
            onBlur={() => updateNewConversationNameInputFocus(false)}
            leftIcon={{
              text: ownName.charAt(0)
            }}
            submitIcon={{
              text: '+'
            }}
            onSubmit={createConversation}
            isIlluminated={isNewConversationNameInputFocused}
          />
        </div>
        <BarButton
          onClick={isConfirmingSignOut ? actuallySignOut : confirmSignOut}
          text={!isConfirmingSignOut ? 'Sign out' : 'Tap again to confirm sign out'}
          icon={{
            text: 'x',
            backgroundColor: '#eee',
            color: '#921'
          }}
          theme="red"
          isIlluminated={isConfirmingSignOut}
        />
      </div>
      <div className="ConversationSelector-actions-container Treechat-container Treechat-theme-grey">
        {(!isNewConversationNameInputFocused && selectedConversation) ?
          <div>
            <CircleButton
              theme="blue"
              icon={{
                text: '>'
              }}
              onClick={openSelectedConversation}
            />
            <CircleButton
              theme="blue"
              icon={{
                text: 'x'
              }}
              onClick={confirmWithdrawalFromSelectedConversation}
            />
            <CircleButton
              theme="blue"
              icon={{
                text: '+'
              }}
              onClick={openSelectedConversationMemberMenu}
            />
          </div>
          : 'Tap a conversation to select it.'
        }
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationSelector)
