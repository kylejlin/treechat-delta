import firebase from '../firebase'

const db = firebase.firestore()

export function createConversation() {
  return (dispatch, getState) => {
    // TODO
  }
}

export function editNewConversationName(value) {
  return { type: 'EDIT_NEW_CONVERSATION_NAME', value }
}

export function getAndHandleAuthState() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName } = user
        const userRef = db.collection('users').doc(uid)
        userRef.get().then(userDoc => {
          if (userDoc.exists) {
            const { displayName } = userDoc.data()
            dispatch(login(displayName, uid))
            userRef.onSnapshot(userDoc => {
              dispatch(getAndStoreConversationRefs(userDoc.data().conversations))
            })
          } else {
            userRef.set({
              displayName,
              conversations: []
            })
            dispatch(login(displayName, uid))
            userRef.onSnapshot(userDoc => {
              dispatch(getAndStoreConversationRefs(userDoc.data().conversations))
            })
          }
        })
      } else {
        dispatch(navigateToLoginPage())
      }
    })
  }
}

function getAndStoreConversationRefs(refs) {
  return (dispatch, getState) => {
    // It stores conversation summaries in state.conversations
    // Summaries are used by <ConversationSelector /> to display the conversations

    const promises = refs.map(ref => new Promise((resolve, reject) => {
      ref.get().then(conversationDoc => {
        const { rootText, messages: messageRefs, members: memberRefs } = conversationDoc.data()
        resolve({
          rootText,
          messageRefs,
          memberRefs,
          ref
        })
      }).catch(error => reject(error))
    }))
    Promise.all(promises).then(conversationSummaries => {
      dispatch(storeConversationSummaries(conversationSummaries))
    })
  }
}

function login(ownName, ownUid) {
  return { type: 'LOGIN', ownName, ownUid }
}

function navigateToLoginPage() {
  return { type: 'NAVIGATE_TO_LOGIN_PAGE' }
}

export function openSelectedConversation() {
  // TODO: Reducer
  alert('Opening...')
  return { type: 'OPEN_SELECTED_CONVERSATION' }
}

export function openSelectedConversationMemberMenu() {
  // TODO: Reducer
  alert('Opening member menu...')
  return { type: 'OPEN_SELECTED_CONVERSATION_MEMBER_MENU'}
}

export function selectConversation(conversationSummary) {
  return { type: 'SELECT_CONVERSATION', conversationSummary }
}

export function signInWithGoogleRedirect() {
  return (dispatch, getState) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }
}

function storeConversationSummaries(conversationSummaries) {
  return { type: 'STORE_CONVERSATION_SUMMARIES', conversationSummaries }
  // TODO: reducer
}

export function updateNewConversationNameInputFocus(value) {
  return { type: 'UPDATE_NEW_CONVERSATION_NAME_INPUT_FOCUS', value }
}

export function withdrawFromSelectedConversation() {
  // TODO Reducer
  alert('Withdrawing')
  return { type: 'WITHDRAW_FROM_SELECTED_CONVERSATION' }
}
