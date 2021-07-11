import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Menu as MenuIcon } from "@material-ui/icons"

export default function Header({ title, user=null }) {
    return (
        <React.Fragment>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h2"
                        variant="h5">
                        {title}
                    </Typography>
                    {user ? <div>User</div> : (
                        <React.Fragment>
                            <Button color="inherit">Login</Button>
                            <Button color="inherit">Registration</Button>
                        </React.Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}