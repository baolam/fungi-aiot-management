import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import './assets/css/style.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>
);
