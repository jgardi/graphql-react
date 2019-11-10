import React from 'react'
import { Toolbar, AppBar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { useStyles } from '@material-ui/pickers/views/Year/YearView'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 1,
  },
  avatar: {
    width: '30px',
    height: '30px',
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  drawerPaper: {
    borderRight: '1px solid #e8e3e3',
  },
})

function Header(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar color="inherit" position="sticky" elevation={0}>
        <Toolbar>
          <Typography key={1} className={classes.title}>
            Hilton Demo
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default withStyles(styles)(Header)
