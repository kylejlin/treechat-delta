import firebase from '../firebase'
import sha256 from 'js-sha256'

const db = firebase.firestore()

export function createConversation() {
  return (dispatch, getState) => {
    const state = getState()
    const newRootText = state.fields.newConversationName
    const uid = state.ownIdentity.uid

    if (newRootText.length === 0) {
      alert('Name your conversation.')
      return
    }

    const uniqueConversationId =  sha256(
      uid + newRootText + Date.now()
    )
    const conversationRef = db.collection('conversations').doc(uniqueConversationId)
    const userRef = db.collection('users').doc(uid)

    conversationRef.set({
      rootText: newRootText,
      members: [userRef],
      messages: []
    }).then(() => {
      userRef.get().then(userDoc => {
        const oldConversationRefs = userDoc.data().conversations
        const newConversationRefs = oldConversationRefs.concat([conversationRef])
        userRef.update({
          conversations: newConversationRefs
        })
      })
    })

    dispatch(editNewConversationName(''))
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

function navigateToConversation(conversationContents, conversationUnsubscriber) {
  return { type: 'NAVIGATE_TO_CONVERSATION', conversationContents, conversationUnsubscriber }
}

function navigateToLoginPage() {
  return { type: 'NAVIGATE_TO_LOGIN_PAGE' }
}

export function openSelectedConversation() {
  return (dispatch, getState) => {
    const state = getState()
    const conversationSummary = state.fields.selectedConversation
    const {
      ref: conversationRef,
      rootText,
      memberRefs,
      messageRefs,
    } = conversationSummary

    const unsubscribe = conversationRef.onSnapshot(conversationDoc => {
      // 1) Get and store the name of each member in a dictionary of the form
      //    <reference id, displayName> for easy lookups in the future
      const memberNamePromises = memberRefs.map(memberRef => new Promise((resolve, reject) => {
        memberRef.get().then(memberDoc => {
          resolve({
            id: memberRef.id,
            name: memberDoc.data().displayName
          })
        })
      }))
      const memberNameDictPromise = Promise.all(memberNamePromises).then(nameMaps => {
        const memberNameDict = {}

        for (let nameMap of nameMaps) {
          memberNameDict[nameMap.id] = nameMap.name
        }

        return memberNameDict
      })

      // 2) Get and store all texts of messages in an array
      const messagePromises = messageRefs.map(messageRef => new Promise((resolve, reject) => {
        messageRef.get().then(messageDoc => {
          const data = messageDoc.data()
          resolve({
            authorId: data.author.id,
            text: data.text,
            parentId: data.parent ? data.parent.id : null,
            messageId: messageRef.id
          })
        })
      }))
      const messageArrayPromise = Promise.all(messagePromises)

      Promise.all([memberNameDictPromise, messageArrayPromise]).then(([memberNameDict, messageArray]) => {
        const conversationContents = {
          rootText,
          memberNameDict,
          messageArray
        }
        dispatch(navigateToConversation(conversationContents, unsubscribe))
      })
    })
  }
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
