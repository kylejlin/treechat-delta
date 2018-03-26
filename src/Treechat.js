import React from 'react'
import { Provider } from 'react-redux'
import store from './store/index'
import { getAndHandleAuthState } from './store/actions'
import './Treechat.css'

class Treechat extends React.Component {
  render(props) {
    return (
      <Provider store={store}>
        <p>hi</p>
      </Provider>
    )
  }

  componentDidMount() {

  }
}

export default Treechat
