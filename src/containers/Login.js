import React from 'react'
import { connect } from 'react-redux'
import BarButton from '../components/BarButton'
import { signInWithGoogleRedirect } from '../store/actions'

const mapDispatchToProps = dispatch => {
  return {
    onSignInWithGoogleClick: () => {
      dispatch(signInWithGoogleRedirect())
    }
  }
}

const Login = ({
  onSignInWithGoogleClick
}) => (
  <div className="Treechat-theme-green Treechat-container Treechat-full-container">
    <h2>Treechat</h2>
    <BarButton
      theme="blue"
      text="Sign in with Google"
      onClick={onSignInWithGoogleClick}
      icon={{
        text: '>',
        color: '#08b',
        backgroundColor: '#eee'
      }}
    />
  </div>
)

export default connect(null, mapDispatchToProps)(Login)
