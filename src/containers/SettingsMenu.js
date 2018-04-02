import React from 'react'
import { connect } from 'react-redux'

import BarButton from '../components/BarButton'
import InputBar from '../components/InputBar'

import {
  editNewDisplayName,
  updateNewDisplayNameInputFocus,
  changeDisplayName,

  actuallySignOut,
  exitSettingsMenu
} from '../store/actions'

const mapStateToProps = state => {
  return {
    ownDisplayName: state.ownIdentity.name,
    ownPhotoURL: state.ownIdentity.photoURL,

    newDisplayName: state.fields.newDisplayName,
    isNewDisplayNameInputFocused: state.uiState.isNewDisplayNameInputFocused
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editNewDisplayName: value => {
      dispatch(editNewDisplayName(value))
    },
    updateNewDisplayNameInputFocus: isFocused => {
      dispatch(updateNewDisplayNameInputFocus(isFocused))
    },
    changeDisplayName: () => {
      dispatch(changeDisplayName())
    },

    actuallySignOut: () => {
      dispatch(actuallySignOut())
    },

    exitSettingsMenu: () => {
      dispatch(exitSettingsMenu())
    }
  }
}

const SettingsMenu = ({
  ownDisplayName,
  ownPhotoURL,

  newDisplayName,
  editNewDisplayName,
  isNewDisplayNameInputFocused,
  updateNewDisplayNameInputFocus,
  changeDisplayName,

  actuallySignOut,

  exitSettingsMenu
}) => {
  return (
    <div className="Treechat-theme-green Treechat-container Treechat-full-container">
      <div className="Treechat-section-header">Settings</div>
        <InputBar
          value={newDisplayName}
          placeholder={'Change display name (currently ' + ownDisplayName + ')'}
          onChange={editNewDisplayName}
          onFocus={() => updateNewDisplayNameInputFocus(true)}
          onBlur={() => updateNewDisplayNameInputFocus(false)}
          leftIcon={{
            text: <img
              src={ownPhotoURL}
              className="Treechat-circle-icon-image"
              alt=""
            />
          }}
          submitIcon={{
            text: '>'
          }}
          onSubmit={changeDisplayName}
          isIlluminated={isNewDisplayNameInputFocused}
        />
        <BarButton
          onClick={actuallySignOut}
          text="Sign Out"
          theme="red"
          icon={{
            backgroundColor: '#eee',
            color: '#921',
            text: 'x'
          }}
        />
      <BarButton
        onClick={exitSettingsMenu}
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
)(SettingsMenu)
