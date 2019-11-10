import React from 'react'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import { Container, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../theme'

import Home from '../components/Home'
import Footer from '../components/Footer'
import Header from '../components/Header'

import history from '../helpers/history'

const drawerWidth = 180
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  backtotop: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(2),
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
}))

const App = props => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <Router history={history}>
            <div className={classes.app}>
              <Header />
              <Route exact path={'/'} component={Home} />
              <Footer />
            </div>
          </Router>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
