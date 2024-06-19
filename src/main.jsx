import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@radix-ui/themes/styles.css';
import './index.css'
import { Theme, ThemePanel } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme appearance="dark" id='mainTheme' accentColor="iris" grayColor="olive" radius="small" scaling="100%">
      <App />
      {/* <ThemePanel /> */}
    </Theme>
  </React.StrictMode>,
)
