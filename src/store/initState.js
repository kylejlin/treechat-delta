export default {
  authState: {
    isKnown: false,
    isLoggedIn: false
  },
  ownIdentity: {
    name: '?',
    uid: null
  },
  conversationSummaries: [],
  conversationContents: null,
  conversationUnsubscriber: () => {
    throw new TypeError('state.conversationUnsubscriber is not a function')
  },
  fields: {
    newConversationName: '',
    selectedConversation: null,
    focusedMessage: null,
    reply: '',
    username: ''
  },
  uiState: {
    isNewConversationNameInputFocused: false,
    isReplyInputFocused: false,
    isConfirmingSignOut: false
  }
}
