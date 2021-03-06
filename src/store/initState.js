export default {
  authState: {
    isKnown: false,
    isLoggedIn: false
  },
  ownIdentity: {
    name: '?',
    uid: null,
    username: '?',
    photoURL: null,
    googlePhotoURL: null
  },
  conversationSummaries: [],
  conversationContents: null,
  memberMenu: null,
  conversationUnsubscriber: () => {
    throw new TypeError('state.conversationUnsubscriber is not a function')
  },
  fields: {
    newConversationName: '',
    selectedConversation: null,
    focusedMessage: null,
    reply: '',
    username: '',
    newMemberUsername: '',
    newDisplayName: '',
    newPhotoURL: ''
  },
  uiState: {
    isNewConversationNameInputFocused: false,
    isReplyInputFocused: false,
    isConfirmingSignOut: false,
    isNewMemberUsernameInputFocused: false,
    isConfirmingWithdrawal: false,
    isSettingsMenuOpen: false,
    isNewDisplayNameInputFocused: false,
    isNewPhotoURLInputFocused: false
  }
}
