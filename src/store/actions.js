import firebase from '../firebase'

export function signInWithGoogleRedirect() {
  return (dispatch, getState) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  }
}

export function getAndHandleAuthState() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const defaultName = user.displayName
        alert('Hello ' + defaultName)
      } else {
        dispatch(navigateToLoginPage())
      }
    })
  }
}

function navigateToLoginPage() {
  return { type: 'NAVIGATE_TO_LOGIN_PAGE' }
}
