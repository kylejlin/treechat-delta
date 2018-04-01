import initState from './initState'

export default (state = initState, action) => {
  switch (action.type) {
    case 'CLEAR_OWN_IDENTITY':
      return {
        ...state,
        ownIdentity: initState.ownIdentity,
        authState: {
          isKnown: true,
          isLoggedIn: false
        }
      }
    case 'CONFIRM_SIGN_OUT':
      return {
        ...state,
        fields: {
          ...state.fields,
          selectedConversation: null
        },
        uiState: {
          ...state.uiState,
          isConfirmingSignOut: true
        }
      }
    case 'CONFIRM_WITHDRAWAL_FROM_SELECTED_CONVERSATION':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isConfirmingWithdrawal: true
        }
      }
    case 'EDIT_NEW_CONVERSATION_NAME':
      return {
        ...state,
        fields: {
          ...state.fields,
          newConversationName: action.value
        }
      }
    case 'EDIT_NEW_MEMBER_USERNAME':
      return {
        ...state,
        fields: {
          ...state.fields,
          newMemberUsername: action.value
        }
      }
    case 'EDIT_REPLY':
      return {
        ...state,
        fields: {
          ...state.fields,
          reply: action.value
        }
      }
    case 'EDIT_USERNAME':
      return {
        ...state,
        fields: {
          ...state.fields,
          username: action.value
        }
      }
    case 'EXIT_CONVERSATION':
      return {
        ...state,
        conversationContents: null,
        conversationUnsubscriber: null,
        fields: {
          ...state.fields,
          focusedMessage: null,
          reply: ''
        }
      }
    case 'EXIT_MEMBER_MENU':
      return {
        ...state,
        memberMenu: null,
        fields: {
          ...state.fields,
          newMemberUsername: ''
        }
      }
    case 'EXIT_WITHDRAWAL_CONFIRMATION_PAGE':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isConfirmingWithdrawal: false
        }
      }
    case 'FOCUS_MESSAGE':
      return {
        ...state,
        fields: {
          ...state.fields,
          focusedMessage: action.focusedMessage
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
          uid: action.ownUid,
          username: action.ownUsername,
          photoURL: action.photoURL
        }
      }
    case 'NAVIGATE_TO_CONVERSATION':
      return {
        ...state,
        conversationContents: action.conversationContents,
        conversationUnsubscriber: action.conversationUnsubscriber
      }
    case 'NAVIGATE_TO_JOIN_PAGE':
      return {
        ...state,
        authState: {
          isKnown: true,
          isLoggedIn: false
        },
        ownIdentity: {
          name: action.displayName,
          uid: action.uid,
          photoURL: action.photoURL
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
    case 'NAVIGATE_TO_MEMBER_MENU':
      return {
        ...state,
        memberMenu: action.memberMenu,
        conversationUnsubscriber: action.conversationUnsubscriber
      }
    case 'SELECT_CONVERSATION':
      return {
        ...state,
        fields: {
          ...state.fields,
          selectedConversation: action.conversationSummary
        },
        uiState: {
          ...state.uiState,
          isConfirmingSignOut: false
        }
      }
    case 'STORE_CONVERSATION_SUMMARIES':
      return {
        ...state,
        conversationSummaries: action.conversationSummaries
      }
    case 'UNSELECT_CONVERSATION_AND_UNCONFIRM_SIGN_OUT':
      return {
        ...state,
        fields: {
          ...state.fields,
          selectedConversation: null
        },
        uiState: {
          ...state.uiState,
          isConfirmingSignOut: false
        }
      }
    case 'UPDATE_NEW_CONVERSATION_NAME_INPUT_FOCUS':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isNewConversationNameInputFocused: action.value,
          isConfirmingSignOut: false
        }
      }
    case 'UPDATE_NEW_MEMBER_USERNAME_INPUT_FOCUS':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isNewMemberUsernameInputFocused: action.value
        }
      }
    case 'UPDATE_REPLY_INPUT_FOCUS':
      return {
        ...state,
        uiState: {
          ...state.uiState,
          isReplyInputFocused: action.value
        }
      }
    default:
      return state
  }
}
