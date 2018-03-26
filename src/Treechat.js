import React from 'react'
import { Provider } from 'react-redux'
import TreechatRouter from './containers/TreechatRouter'
import store from './store/index'
import { getAndHandleAuthState } from './store/actions'
import './Treechat.css'

class Treechat extends React.Component {
  render(props) {
    return (
      <Provider store={store}>
        <TreechatRouter />
      </Provider>
    )
  }

  componentDidMount() {
    store.dispatch(getAndHandleAuthState())
  }
}

export default Treechat
