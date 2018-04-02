import React from 'react'
import { connect } from 'react-redux'

import BarButton from '../components/BarButton'
import InputBar from '../components/InputBar'

import {
  revertToGooglePhotoURL,
  
  editNewDisplayName,
  updateNewDisplayNameInputFocus,
  changeDisplayName,

  editNewPhotoURL,
  updateNewPhotoURLInputFocus,
  changePhotoURL,

  actuallySignOut,
  exitSettingsMenu
} from '../store/actions'

const mapStateToProps = state => {
  return {
    ownDisplayName: state.ownIdentity.name,
    ownPhotoURL: state.ownIdentity.photoURL,

    googlePhotoURL: state.ownIdentity.googlePhotoURL,

    newDisplayName: state.fields.newDisplayName,
    isNewDisplayNameInputFocused: state.uiState.isNewDisplayNameInputFocused,

    newPhotoURL: state.fields.newPhotoURL,
    isNewPhotoURLInputFocused: state.uiState.isNewPhotoURLInputFocused
  }
}

const mapDispatchToProps = dispatch => {
  return {
    revertToGooglePhotoURL: () => {
      dispatch(revertToGooglePhotoURL())
    },

    editNewDisplayName: value => {
      dispatch(editNewDisplayName(value))
    },
    updateNewDisplayNameInputFocus: isFocused => {
      dispatch(updateNewDisplayNameInputFocus(isFocused))
    },
    changeDisplayName: () => {
      dispatch(changeDisplayName())
    },

    editNewPhotoURL: value => {
      dispatch(editNewPhotoURL(value))
    },
    updateNewPhotoURLInputFocus: isFocused => {
      dispatch(updateNewPhotoURLInputFocus(isFocused))
    },
    changePhotoURL: () => {
      dispatch(changePhotoURL())
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

  googlePhotoURL,
  revertToGooglePhotoURL,

  newDisplayName,
  editNewDisplayName,
  isNewDisplayNameInputFocused,
  updateNewDisplayNameInputFocus,
  changeDisplayName,

  newPhotoURL,
  editNewPhotoURL,
  isNewPhotoURLInputFocused,
  updateNewPhotoURLInputFocus,
  changePhotoURL,

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
        <InputBar
          value={newPhotoURL}
          placeholder={'Change photo URL (currently ' + ownPhotoURL + ')'}
          onChange={editNewPhotoURL}
          onFocus={() => updateNewPhotoURLInputFocus(true)}
          onBlur={() => updateNewPhotoURLInputFocus(false)}
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
          onSubmit={changePhotoURL}
          isIlluminated={isNewPhotoURLInputFocused}
        />
        <BarButton
          onClick={revertToGooglePhotoURL}
          text="Revert to Google Profile Photo"
          theme="white"
          icon={{
            text: <img
              src={googlePhotoURL}
              className="Treechat-circle-icon-image"
              alt=""
            />
          }}
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
