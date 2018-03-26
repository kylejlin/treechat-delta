import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import LoadingScreen from './LoadingScreen'

const mapStateToProps = state => {
  return {
    authState: state.authState
  }
}

const TreechatRouter = ({ authState }) => {
  if (!authState.isKnown) {
    return <LoadingScreen />
  }
  if (!authState.isLoggedIn) {
    return <Login />
  }
  return <p>Logged in :)</p>
}

export default connect(mapStateToProps, null)(TreechatRouter)
