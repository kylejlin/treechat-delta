import React from 'react'
import { connect } from 'react-redux'

import BarButton from '../components/BarButton'
import InputBar from '../components/InputBar'

import {
  editNewMemberUsername,
  updateNewMemberUsernameInputFocus,
  addMemberToConversation,

  unsubscribeAndExitMemberMenu
} from '../store/actions'

const mapStateToProps = state => {
  return {
    rootText: state.memberMenu.conversationRootText,

    members: state.memberMenu.members,

    newMemberUsername: state.fields.newMemberUsername,
    isNewMemberUsernameInputFocused: state.uiState.isNewMemberUsernameInputFocused
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editNewMemberUsername: value => {
      dispatch(editNewMemberUsername(value))
    },
    updateNewMemberUsernameInputFocus: isFocused => {
      dispatch(updateNewMemberUsernameInputFocus(isFocused))
    },
    addMember: () => {
      dispatch(addMemberToConversation())
    },

    exitMemberMenu: () => {
      dispatch(unsubscribeAndExitMemberMenu())
    }
  }
}

const MemberMenu = ({
  rootText,

  members,

  newMemberUsername,
  editNewMemberUsername,
  isNewMemberUsernameInputFocused,
  updateNewMemberUsernameInputFocus,
  addMember,

  exitMemberMenu
}) => {
  return (
    <div className="Treechat-theme-green Treechat-container Treechat-full-container">
      <div className="Treechat-section-header">Members of {rootText}</div>
      {members.map((member, i) => (
        <BarButton
          key={member.username}
          text={member.displayName + ' (' + member.username + ')'}
          icon={{
            text: <img
              src={member.photoURL}
              className="Treechat-circle-icon-image"
              alt=""
            />
          }}
          theme="white"
        />
      ))}
      <div>
        <InputBar
          value={newMemberUsername}
          placeholder="New member (type username)"
          onChange={editNewMemberUsername}
          onFocus={() => updateNewMemberUsernameInputFocus(true)}
          onBlur={() => updateNewMemberUsernameInputFocus(false)}
          leftIcon={{
            text: '?'
          }}
          submitIcon={{
            text: '+'
          }}
          onSubmit={addMember}
          isIlluminated={isNewMemberUsernameInputFocused}
        />
      </div>
      <BarButton
        onClick={exitMemberMenu}
        text="Back"
        theme="grey"
        icon={{
          backgroundColor: '#eee',
          color: '#333',
          text: '<'
        }}
      />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberMenu)
