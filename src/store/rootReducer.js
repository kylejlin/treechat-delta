import initState from './initState'

export default (state = initState, action) => {
  switch (action.type) {
    case 'NAVIGATE_TO_LOGIN_PAGE':
      return {
        ...state,
        authState: {
          isKnown: true,
          isLoggedIn: false
        }
      }
    default:
      return state
  }
}
