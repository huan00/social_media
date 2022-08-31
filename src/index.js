import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
import store from './app/store'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

// const store = createStore(reducers, compose(applyMiddleware(thunk)))

const theme = createTheme({
  palette: {
    // primary: {
    //   main: '#CCC'
    // }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
