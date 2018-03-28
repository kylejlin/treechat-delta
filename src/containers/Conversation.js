import React from 'react'
import { connect } from 'react-redux'

import './Conversation.css'

import BarButton from '../components/BarButton'
import InputBar from '../components/InputBar'

import {
  focusMessage,

  editReply,
  updateReplyInputFocus,
  submitReply,

  unsubscribeAndExitConversation
} from '../store/actions'



// Helpers
const getParentMessagesFromState = state => {
  const focusedMessage = state.fields.focusedMessage

  if (focusedMessage === null) {
    return []
  }

  const parentMessages = []
  let currentMessage = focusedMessage
  while (currentMessage.parentId !== null) {
    const parentMessage = state.conversationContents.messageArray.find(message => {
      return message.messageId === currentMessage.parentId
    })
    parentMessages.push(parentMessage)
    currentMessage = parentMessage
  }
  return parentMessages
}

const getChildMessagesFromState = state => {
  const focusedMessage = state.fields.focusedMessage
  const focusedMessageId = focusedMessage === null
    ? null
    : focusedMessage.messageId
  const childMessages = state.conversationContents.messageArray.filter(message => {
    return message.parentId === focusedMessageId
  })
  return childMessages
}



const mapStateToProps = state => {
  return {
    ownName: state.ownIdentity.name,

    rootText: state.conversationContents.rootText,
    parentMessages: getParentMessagesFromState(state),
    focusedMessage: state.fields.focusedMessage,
    childMessages: getChildMessagesFromState(state),

    reply: state.fields.reply,
    isReplyInputFocused: state.uiState.isReplyInputFocused
  }
}

const mapDispatchToProps = dispatch => {
  return {
    focusMessage: message => {
      dispatch(focusMessage(message))
    },

    editReply: value => {
      dispatch(editReply(value))
    },
    updateReplyInputFocus: isFocused => {
      dispatch(updateReplyInputFocus(isFocused))
    },
    submitReply: () => {
      dispatch(submitReply())
    },

    exitConversation: () => {
      dispatch(unsubscribeAndExitConversation())
    }
  }
}



const Conversation = ({
  ownName,

  rootText,
  parentMessages,
  focusedMessage,
  childMessages,

  focusMessage,

  reply,
  editReply,
  isReplyInputFocused,
  updateReplyInputFocus,
  submitReply,

  exitConversation
}) => (
  <div className="Conversation">
    <div className="Treechat-container Conversation-top-container Treechat-theme-white">
      <BarButton
        text="Back"
        theme="grey"
        icon={{
          backgroundColor: '#eee',
          color: '#333',
          text: '<'
        }}
        onClick={exitConversation}
      />
      <BarButton
        text={rootText}
        theme="green"
        icon={{
          text: '?'
        }}
        onClick={() => focusMessage(null)}
        isIlluminated={!isReplyInputFocused && (focusedMessage === null)}
      />
      {parentMessages.map(message => (
        <BarButton
          key={message.messageId}
          text={message.text}
          theme="green"
          icon={{
            text: '?'
          }}
          onClick={() => focusMessage(message)}
        />
      ))}
      {focusedMessage !== null &&
        <BarButton
          text={focusedMessage.text}
          theme="green"
          isIlluminated={!isReplyInputFocused}
          icon={{
            text: '?'
          }}
        />
      }
    </div>
    <div className="Treechat-container Conversation-bottom-container Treechat-theme-grey">
      {childMessages.length ?
        childMessages.map(message => (
          <BarButton
            key={message.messageId}
            text={message.text}
            theme="green"
            icon={{
              text: '?'
            }}
            onClick={() => focusMessage(message)}
          />
        ))
        : <div>No replies.</div>
      }
      <div>
        <InputBar
          value={reply}
          placeholder="Reply"
          onChange={editReply}
          onFocus={() => updateReplyInputFocus(true)}
          onBlur={() => updateReplyInputFocus(false)}
          leftIcon={{
            text: ownName.charAt(0)
          }}
          submitIcon={{
            backgroundColor: '#eee',
            color: '#08b'
          }}
          onSubmit={submitReply}
          isIlluminated={isReplyInputFocused}
        />
      </div>
    </div>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation)
