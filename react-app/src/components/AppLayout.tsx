import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface AppLayoutProps {
    title?: string
    user?: string
    children?: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  toolbarButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  content: {
    marginTop: "72px"
  }
}))

export default function AppLayout({ title = "CodeShaper", user, children }: AppLayoutProps) {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            className={classes.title}
            component="h2"
            variant="h5"
          >
            {title}
          </Typography>
          {user ? <div>User</div> : <React.Fragment>
            <Button className={classes.toolbarButton} color="inherit">
              Вход
            </Button>
            <Button className={classes.toolbarButton} color="inherit">
              Регистрация
            </Button>
          </React.Fragment>}
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        {children}
      </Container>
    </Container>
  );
}
