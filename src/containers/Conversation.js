import React from 'react'
import { connect } from 'react-redux'

import './Conversation.css'

import BarButton from '../components/BarButton'
import Message from '../components/Message'
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
  const isMessageTheParent = message =>
    message.messageId === currentMessage.parentId
  while (currentMessage.parentId !== null) {
    const parentMessage = state.conversationContents.messageArray.find(isMessageTheParent)
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
    ownUsername: state.ownIdentity.username,
    ownPhotoURL: state.ownIdentity.photoURL,

    memberDict: state.conversationContents.memberNameDict,

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
  ownUsername,
  ownPhotoURL,

  memberDict,

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
          text: '',
          color: '#22252A',
          backgroundColor: '#22252A'
        }}
        onClick={() => focusMessage(null)}
        isIlluminated={!isReplyInputFocused && (focusedMessage === null)}
      />
      {parentMessages.map(message => (
        <Message
          key={message.messageId}
          text={message.text}
          theme={
            memberDict[message.authorId].username === ownUsername
              ? 'blue'
              : 'green'
          }
          icon={
            <img
              src={memberDict[message.authorId].photoURL}
              className="Treechat-circle-icon-image"
              alt=""
            />
          }
          onClick={() => focusMessage(message)}
        />
      ))}
      {focusedMessage !== null &&
        <Message
          text={focusedMessage.text}
          theme={
            memberDict[focusedMessage.authorId].username === ownUsername
              ? 'blue'
              : 'green'
          }
          isIlluminated={!isReplyInputFocused}
          icon={
            <img
              src={memberDict[focusedMessage.authorId].photoURL}
              className="Treechat-circle-icon-image"
              alt=""
            />
          }
        />
      }
    </div>
    <div className="Treechat-container Conversation-bottom-container Treechat-theme-grey">
      {childMessages.length ?
        childMessages.map(message => (
          <Message
            key={message.messageId}
            text={message.text}
            theme={
              memberDict[message.authorId].username === ownUsername
                ? 'blue'
                : 'green'
            }
            icon={
              <img
                src={memberDict[message.authorId].photoURL}
                className="Treechat-circle-icon-image"
                alt=""
              />
            }
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
            text: <img
              src={ownPhotoURL}
              className="Treechat-circle-icon-image"
              alt=""
            />
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
