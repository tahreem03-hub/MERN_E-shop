import './index.css';
import App from './App.jsx';
import Store from './redux/Store.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />
    </Provider>
  </BrowserRouter>
);