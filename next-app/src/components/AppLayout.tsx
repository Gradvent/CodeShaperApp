import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, IconButton, Icon, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Link from 'next/link'
import { UserContext } from '../user';

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

function UserMenuActions() {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <UserContext.Consumer>
      {(user) => (!user ? <React.Fragment>
        <Link href="/login">
          <Button className={classes.toolbarButton} color="inherit">
            Вход
          </Button>
        </Link>
        <Link href="/register">
          <Button className={classes.toolbarButton} color="inherit">
            Регистрация
          </Button>
        </Link>
      </React.Fragment> :
        <React.Fragment>
          <Link href="/my-pasta/1">
            <Button>
              Моя паста
            </Button>
          </Link>

          <Button aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
            {user.name}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Моя паста</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </UserContext.Consumer>
  )
}

export default function AppLayout({ title = "CodeShaper", user, children }: AppLayoutProps) {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <AppBar position="absolute">
        <Container maxWidth="md">
          <Toolbar>
            <Link href="/">
              <Typography
                className={classes.title}
                component="h2"
                variant="h5"
              >
                {title}
              </Typography>
            </Link>
            <UserMenuActions />
          </Toolbar>
        </Container>
      </AppBar>
      <Container className={classes.content} maxWidth="md">
        {children}
      </Container>
    </Container>
  );
}
