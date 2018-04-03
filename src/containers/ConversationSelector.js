import React from 'react'
import { connect } from 'react-redux'

import './ConversationSelector.css'

import BarButton from '../components/BarButton'
import InputBar from '../components/InputBar'

import addMemberIcon from '../icons/addMember.svg'
import openConversationIcon from '../icons/openConversation.svg'
import withdrawFromConversationIcon from '../icons/withdrawFromConversation.svg'

import {
  unselectConversationAndUnconfirmSignOut,

  editNewConversationName,
  updateNewConversationNameInputFocus,
  createConversation,

  selectConversation,
  openSelectedConversation,
  confirmWithdrawalFromSelectedConversation,
  openSelectedConversationMemberMenu,

  navigateToSettingsMenu
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
    ownPhotoURL: state.ownIdentity.photoURL,
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

    navigateToSettingsMenu: () => {
      dispatch(navigateToSettingsMenu())
    }
  }
}

const ConversationSelector = ({
  onBackgroundClick,

  ownName,
  ownPhotoURL,

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

  navigateToSettingsMenu
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
              text: <img
                src={ownPhotoURL}
                className="Treechat-circle-icon-image"
                alt=""
              />
            }}
            submitIcon={{
              text: '+'
            }}
            onSubmit={createConversation}
            isIlluminated={isNewConversationNameInputFocused}
          />
        </div>
        <BarButton
          onClick={navigateToSettingsMenu}
          text="Settings"
          icon={{
            text: '*',
            backgroundColor: '#eee',
            color: '#22252A'
          }}
          theme="grey"
        />
      </div>
      <div className="ConversationSelector-actions-container Treechat-container Treechat-theme-grey">
        {(!isNewConversationNameInputFocused && selectedConversation) ?
          <div>
            <img
              src={openConversationIcon}
              onClick={openSelectedConversation}
              className="Treechat-circle-icon-image-large"
              alt="Open conversation"
            />
            <img
              src={addMemberIcon}
              onClick={openSelectedConversationMemberMenu}
              className="Treechat-circle-icon-image-large"
              alt="Add members"
            />
            <img
              src={withdrawFromConversationIcon}
              onClick={confirmWithdrawalFromSelectedConversation}
              className="Treechat-circle-icon-image-large"
              alt="Leave conversation"
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
