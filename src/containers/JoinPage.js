import React from 'react'
import { connect } from 'react-redux'
import InputBar from '../components/InputBar'
import { editUsername, joinWithGoogle } from '../store/actions'

const mapStateToProps = state => {
  return {
    username: state.fields.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUsername: value => {
      dispatch(editUsername(value))
    },
    joinWithGoogle: () => {
      dispatch(joinWithGoogle())
    }
  }
}

const JoinPage = ({
  username,
  editUsername,
  joinWithGoogle
}) => (
  <div className="Treechat-theme-green Treechat-container Treechat-full-container">
    <h2>Treechat</h2>
    <div className="Treechat-section-header">Join with Google</div>
    <InputBar
      value={username}
      placeholder="Username"
      onChange={editUsername}
      onSubmit={joinWithGoogle}
      isIlluminated={true}
    />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(JoinPage)
