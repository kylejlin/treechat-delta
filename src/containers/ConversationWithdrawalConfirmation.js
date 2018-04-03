import React from 'react'
import { connect } from 'react-redux'
import BarButton from '../components/BarButton'
import { withdrawFromSelectedConversation, exitWithdrawalConfirmationPage } from '../store/actions'

const mapStateToProps = state => {
  return {
    rootText: state.fields.selectedConversation.rootText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    withdrawFromSelectedConversation: () => {
      dispatch(withdrawFromSelectedConversation())
    },
    exitWithdrawalConfirmationPage: () => {
      dispatch(exitWithdrawalConfirmationPage())
    }
  }
}

const ConversationWithdrawalConfirmation = ({
  rootText,
  withdrawFromSelectedConversation,
  exitWithdrawalConfirmationPage
}) => (
  <div className="Treechat-theme-green Treechat-container Treechat-full-container">
    <h2>Treechat</h2>
    <div className="Treechat-section-header">Leave {rootText}?</div>
    <p>
      If you leave, you will no longer be a member of this conversation, meaning
      you will no longer be able to send or read messages.
      You will not be able to join back on your own. However, if there are other
      members in this conversation, they will be able to invite you back.
    </p>
    <BarButton
      onClick={withdrawFromSelectedConversation}
      text="I'm certain"
      icon={{
        text: 'x',
        backgroundColor: '#eee',
        color: '#921'
      }}
      theme="red"
    />
    <BarButton
      onClick={exitWithdrawalConfirmationPage}
      text="Cancel"
      theme="grey"
      icon={{
        backgroundColor: '#eee',
        color: '#333',
        text: '<'
      }}
    />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ConversationWithdrawalConfirmation)
