import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Treechat from './Treechat';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Treechat />, document.getElementById('root'));
registerServiceWorker();
