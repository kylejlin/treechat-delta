import initState from './initState'

export default (state = initState, action) => {
  switch (action.type) {
    case 'EDIT_NEW_CONVERSATION_NAME':
      return {
        ...state,
        fields: {
          ...state.fields,
          newConversationName: action.value
        }
      }
    case 'LOGIN':
      return {
        ...state,
        authState: {
          isKnown: true,
          isLoggedIn: true
        },
        ownIdentity: {
          name: action.ownName,
          uid: action.ownUid
        }
      }
    case 'NAVIGATE_TO_CONVERSATION':
      return {
        ...state,
        conversationContents: action.conversationContents,
        conversationUnsubscriber: action.conversationUnsubscriber,
        fields: {
          ...state.fields,
          focusedMessage: null
        }
      }
    case 'NAVIGATE_TO_LOGIN_PAGE':
      return {
        ...state,
        authState: {
          isKnown: true,
          isLoggedIn: false
        }
      }
    case 'SELECT_CONVERSATION':
      return {
        ...state,
        fields: {
          ...state.fields,
          selectedConversation: action.conversationSummary
        }
      }
    case 'STORE_CONVERSATION_SUMMARIES':
      return {
        ...state,
        conversationSummaries: action.conversationSummaries
      }
    case 'UPDATE_NEW_CONVERSATION_NAME_INPUT_FOCUS':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isNewConversationNameInputFocused: action.value
        }
      }
    default:
      return state
  }
}
