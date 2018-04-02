import firebase from '../firebase'
import sha256 from 'js-sha256'

const db = firebase.firestore()

export function actuallySignOut() {
  return (dispatch, getState) => {
    firebase.auth().signOut()
    dispatch(clearOwnIdentity())
  }
}

export function addMemberToConversation() {
  return (dispatch, getState) => {
    const state = getState()
    const { newMemberUsername } = state.fields
    const { conversationRef } = state.memberMenu

    if (newMemberUsername === '') {
      return
    }

    const newMemberUsernameRef = db.collection('usernames').doc(newMemberUsername)
    newMemberUsernameRef.get().then(newMemberUsernameDoc => {
      if (!newMemberUsernameDoc.exists) {
        alert('User ' + newMemberUsername + ' does not exist.')
        return
      }
      const { uid } = newMemberUsernameDoc.data()
      const newMemberRef = db.collection('users').doc(uid)
      newMemberRef.get().then(newMemberDoc => {
        if (!newMemberDoc.exists) {
          alert('User ' + newMemberUsername + ' does not exist.')
          return
        }
        const existingConversationRefs = newMemberDoc.data().conversations
        conversationRef.get().then(conversationDoc => {
          const { members: existingMemberRefs } = conversationDoc.data()
          conversationRef.update({
            members: existingMemberRefs.concat([newMemberRef])
          }).then(() => {
            newMemberRef.update({
              conversations: existingConversationRefs.concat([conversationRef])
            })
          })
        })
      })
    })

    dispatch(editNewMemberUsername(''))
  }
}

export function changeDisplayName() {
  return (dispatch, getState) => {
    const state = getState()
    const { uid, username, photoURL, googlePhotoURL } = state.ownIdentity
    const userRef = db.collection('users').doc(uid)
    const { newDisplayName } = state.fields

    if (
      newDisplayName.length === 0
      || newDisplayName.length > 32
      || /^\s*$/.test(newDisplayName)
    ) {
      alert('Illegally formatted display name!')
      return
    }

    userRef.update({
      displayName: newDisplayName
    }).then(() => {
      dispatch(login(newDisplayName, uid, username, photoURL, googlePhotoURL))
      dispatch(editNewPhotoURL(''))
    })
  }
}

export function changePhotoURL() {
  return (dispatch, getState) => {
    const state = getState()
    const { name, uid, username, googlePhotoURL } = state.ownIdentity
    const { newPhotoURL } = state.fields

    const userRef = db.collection('users').doc(uid)
    userRef.update({
      photoURL: newPhotoURL
    }).then(() => {
      dispatch(login(name, uid, username, newPhotoURL, googlePhotoURL))
      dispatch(editNewPhotoURL(''))
    })
  }
}

function clearOwnIdentity() {
  return { type: 'CLEAR_OWN_IDENTITY' }
}

export function confirmSignOut() {
  return { type: 'CONFIRM_SIGN_OUT' }
}

export function confirmWithdrawalFromSelectedConversation() {
  return { type: 'CONFIRM_WITHDRAWAL_FROM_SELECTED_CONVERSATION' }
}

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

export function editNewDisplayName(value) {
  return { type: 'EDIT_NEW_DISPLAY_NAME', value }
}

export function editNewMemberUsername(value) {
  return { type: 'EDIT_NEW_MEMBER_USERNAME', value }
}

export function editNewPhotoURL(value) {
  return { type: 'EDIT_NEW_PHOTO_URL', value }
}

export function editReply(value) {
  return { type: 'EDIT_REPLY', value }
}

export function editUsername(value) {
  return { type: 'EDIT_USERNAME', value }
}

export function exitConversation() {
  return { type: 'EXIT_CONVERSATION' }
}

function exitMemberMenu() {
  return { type: 'EXIT_MEMBER_MENU' }
}

export function exitSettingsMenu() {
  return { type: 'EXIT_SETTINGS_MENU' }
}

export function exitWithdrawalConfirmationPage() {
  return { type: 'EXIT_WITHDRAWAL_CONFIRMATION_PAGE' }
}

export function focusMessage(focusedMessage) {
  return { type: 'FOCUS_MESSAGE', focusedMessage }
}

export function getAndHandleAuthState() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL: googlePhotoURL } = user
        const userRef = db.collection('users').doc(uid)
        userRef.get().then(userDoc => {
          if (userDoc.exists) {
            const data = userDoc.data()
            const displayName = data.displayName || ''
            const username = data.username.id
            const photoURL = data.photoURL
            dispatch(login(displayName, uid, username, photoURL, googlePhotoURL))
            userRef.onSnapshot(userDoc => {
              dispatch(getAndStoreConversationRefs(userDoc.data().conversations))
            })
          } else {
            dispatch(navigateToJoinPage(uid, displayName, googlePhotoURL))
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

export function joinWithGoogle() {
  return (dispatch, getState) => {
    const state = getState()
    const { username } = state.fields
    const { uid, name: displayName, photoURL } = state.ownIdentity

    if (username === '') {
      return
    }

    const usernameRef = db.collection('usernames').doc(username)
    const userRef = db.collection('users').doc(uid)

    usernameRef.set({
      uid
    }).then(() => {
      userRef.set({
        displayName,
        conversations: [],
        username: usernameRef,
        photoURL
      }).then(() => {
        dispatch(login(displayName, uid, username, photoURL, photoURL))
        userRef.onSnapshot(userDoc => {
          dispatch(getAndStoreConversationRefs(userDoc.data().conversations))
        })
      }).catch(() => {
        alert('Username taken!')
      })
    })
  }
}

function login(ownName, ownUid, ownUsername, photoURL, googlePhotoURL) {
  return { type: 'LOGIN', ownName, ownUid, ownUsername, photoURL, googlePhotoURL }
}

function navigateToConversation(conversationContents, conversationUnsubscriber) {
  return { type: 'NAVIGATE_TO_CONVERSATION', conversationContents, conversationUnsubscriber }
}

function navigateToJoinPage(uid, displayName, photoURL) {
  return { type: 'NAVIGATE_TO_JOIN_PAGE', uid, displayName, photoURL }
}

function navigateToLoginPage() {
  return { type: 'NAVIGATE_TO_LOGIN_PAGE' }
}

function navigateToMemberMenu(memberMenu, conversationUnsubscriber) {
  return { type: 'NAVIGATE_TO_MEMBER_MENU', memberMenu, conversationUnsubscriber }
}

export function navigateToSettingsMenu() {
  return { type: 'NAVIGATE_TO_SETTINGS_MENU' }
}

export function openSelectedConversation() {
  return (dispatch, getState) => {
    const state = getState()
    const conversationSummary = state.fields.selectedConversation
    const {
      ref: conversationRef,
      rootText
    } = conversationSummary

    const unsubscribe = conversationRef.onSnapshot(conversationDoc => {
      const {
        members: memberRefs,
        messages: messageRefs
      } = conversationDoc.data()
      // 1) Get and store the name of each member in a dictionary of the form
      //    <reference id, displayName> for easy lookups in the future
      const memberNamePromises = memberRefs.map(memberRef => new Promise((resolve, reject) => {
        memberRef.get().then(memberDoc => {
          const data = memberDoc.data()
          resolve({
            id: memberRef.id,
            displayName: data.displayName,
            username: data.username.id,
            photoURL: data.photoURL
          })
        })
      }))
      const memberNameDictPromise = Promise.all(memberNamePromises).then(nameMaps => {
        const memberNameDict = {}

        for (let nameMap of nameMaps) {
          memberNameDict[nameMap.id] = {
            displayName: nameMap.displayName,
            username: nameMap.username,
            photoURL: nameMap.photoURL
          }
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
          ref: conversationRef,
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
  return (dispatch, getState) => {
    const state = getState()
    const conversationSummary = state.fields.selectedConversation
    const conversationRef = conversationSummary.ref

    const unsubscribe = conversationRef.onSnapshot(conversationDoc => {
      const memberRefs = conversationDoc.data().members
      const memberNameDictPromises = memberRefs.map(memberRef => new Promise((resolve, reject) => {
        memberRef.get().then(memberDoc => {
          const data = memberDoc.data()
          resolve({
            displayName: data.displayName,
            username: data.username.id,
            photoURL: data.photoURL
          })
        }).catch(reject)
      }))
      Promise.all(memberNameDictPromises).then(memberNameDicts => {
        const memberMenu = {
          conversationRootText: conversationSummary.rootText,
          conversationRef,
          members: memberNameDicts
        }
        dispatch(navigateToMemberMenu(memberMenu, unsubscribe))
      })
    })
  }
}

export function revertToGooglePhotoURL() {
  return (dispatch, getState) => {
    const state = getState()
    const { name, uid, username, googlePhotoURL } = state.ownIdentity
    const userRef = db.collection('users').doc(uid)
    userRef.update({
      photoURL: googlePhotoURL
    }).then(() => {
      dispatch(login(name, uid, username, googlePhotoURL, googlePhotoURL))
    })
  }
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
}

export function submitReply() {
  return (dispatch, getState) => {
    const state = getState()

    const conversationRef = state.conversationContents.ref

    const { uid } = state.ownIdentity
    const userRef = db.collection('users').doc(uid)

    const messageText = state.fields.reply
    const uniqueMessageId =  sha256(
      uid + messageText + Date.now()
    )
    const messageRef = db.collection('messages').doc(uniqueMessageId)

    const { focusedMessage } = state.fields
    const parentMessageRef = focusedMessage === null
      ? null
      : db.collection('messages').doc(focusedMessage.messageId)

    messageRef.set({
      text: messageText,
      author: userRef,
      parent: parentMessageRef,
      conversation: conversationRef
    }).then(() => {
      conversationRef.get().then(conversationDoc => {
        const { messages: existingMessageRefs } = conversationDoc.data()
        conversationRef.update({
          messages: existingMessageRefs.concat([messageRef])
        })
      })
    })

    dispatch(editReply(''))
  }
}

export function unselectConversationAndUnconfirmSignOut() {
  return { type: 'UNSELECT_CONVERSATION_AND_UNCONFIRM_SIGN_OUT' }
}

export function unsubscribeAndExitConversation() {
  return (dispatch, getState) => {
    const unsubscribe = getState().conversationUnsubscriber
    unsubscribe()

    dispatch(exitConversation())
  }
}

export function unsubscribeAndExitMemberMenu() {
  return (dispatch, getState) => {
    const unsubscribe = getState().conversationUnsubscriber
    unsubscribe(

      dispatch(exitMemberMenu())
    )
  }
}

export function updateNewConversationNameInputFocus(value) {
  return { type: 'UPDATE_NEW_CONVERSATION_NAME_INPUT_FOCUS', value }
}

export function updateNewDisplayNameInputFocus(value) {
  return { type: 'UPDATE_NEW_DISPLAY_NAME_INPUT_FOCUS', value }
}

export function updateNewMemberUsernameInputFocus(value) {
  return { type: 'UPDATE_NEW_MEMBER_USERNAME_INPUT_FOCUS', value }
}

export function updateNewPhotoURLInputFocus(value) {
  return { type: 'UPDATE_NEW_PHOTO_URL_INPUT_FOCUS', value }
}

export function updateReplyInputFocus(value) {
  return { type: 'UPDATE_REPLY_INPUT_FOCUS', value }
}

export function withdrawFromSelectedConversation() {
  return (dispatch, getState) => {
    const state = getState()
    const conversationSummary = state.fields.selectedConversation
    const conversationRef = conversationSummary.ref
    const { uid } = state.ownIdentity
    const userRef = db.collection('users').doc(uid)

    conversationRef.get().then(conversationDoc => {
      const { members: memberRefs, messages: messageRefs } = conversationDoc.data()
      const updatedMemberRefs = memberRefs.filter(memberRef => {
        return memberRef.id !== uid
      })
      // JICYDK, Ternary short-circuits
      const withdrawalPromise = updatedMemberRefs.length > 0
        ? conversationRef.update({
          members: updatedMemberRefs
        })
        : conversationRef.delete().then(() => {
          const messagePromises = messageRefs.map(messageRef => messageRef.delete())
          return Promise.all(messagePromises)
        })

      withdrawalPromise.then(() => {
        userRef.get().then(userDoc => {
          const { conversations: conversationRefs } = userDoc.data()
          const updatedConversationRefs = conversationRefs.filter(conversationRef2 => {
            return conversationRef2.id !== conversationRef.id
          })
          userRef.update({
            conversations: updatedConversationRefs
          })
        })
      })
    })

    dispatch(exitWithdrawalConfirmationPage())
  }
}
