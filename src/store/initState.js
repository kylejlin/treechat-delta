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
  fields: {
    newConversationName: '',
    selectedConversation: null,
    focusedConversation: null
  },
  uiState: {
    isNewConversationNameInputFocused: false
  }
}
