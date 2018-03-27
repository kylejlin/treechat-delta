import React from 'react'
import { connect } from 'react-redux'

import './ConversationSelector.css'

import BarButton from '../components/BarButton'
import CircleButton from '../components/CircleButton'
import InputBar from '../components/InputBar'

import {
  editNewConversationName,
  updateNewConversationNameInputFocus,
  createConversation,

  selectConversation,
  openSelectedConversation,
  withdrawFromSelectedConversation,
  openSelectedConversationMemberMenu
} from '../store/actions'



const mapStateToProps = state => {
  return {
    ownName: state.ownIdentity.name,
    conversationSummaries: state.conversationSummaries,
    newConversationName: state.fields.newConversationName,
    isNewConversationNameInputFocused: state.uiState.isNewConversationNameInputFocused,
    selectedConversation: state.fields.selectedConversation
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
    withdrawFromSelectedConversation: () => {
      dispatch(withdrawFromSelectedConversation())
    },
    openSelectedConversationMemberMenu: () => {
      dispatch(openSelectedConversationMemberMenu())
    }
  }
}

const ConversationSelector = ({
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
  withdrawFromSelectedConversation,
  openSelectedConversationMemberMenu,

  /*invitee,
  editInvitee,
  addInvitee,

  signOut*/
}) => {
  return (
    <div className="Treechat">
      <div className="ConversationSelector-conversations-container Treechat-container Treechat-theme-green">
        <div className="Treechat-section-header">Conversations</div>
        {conversationSummaries.map((conversationSummary, i) => (
          <BarButton
            key={i}
            onClick={() => {selectConversation(conversationSummary)}}
            text={conversationSummary.rootText}
            icon={{
              text: '?'
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
              onClick={withdrawFromSelectedConversation}
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
