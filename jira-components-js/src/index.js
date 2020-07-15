import React from 'react';
import ReactDOM from 'react-dom';
import App from './org/rpowell/jira/components/App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(<HashRouter hashType="noslash"><App /></HashRouter>, document.getElementById('root'));
