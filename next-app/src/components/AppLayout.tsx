import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, IconButton, Icon, makeStyles } from '@material-ui/core';
import Link from 'next/link'

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

export default function AppLayout({ title = "CodeShaper", user, children}: AppLayoutProps) {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <AppBar position="absolute">
        <Container maxWidth="md">
          <Toolbar>
            <Typography
              className={classes.title}
              component="h2"
              variant="h5"
            >
              {title}
            </Typography>
            {user ? <div>User</div> : <Link href="/sign">
              <Button className={classes.toolbarButton} color="inherit">
                Вход и регистрация
              </Button>
            </Link>}
          </Toolbar>
        </Container>
      </AppBar>
      <Container className={classes.content} maxWidth="md">
        {children}
      </Container>
    </Container>
  );
}
