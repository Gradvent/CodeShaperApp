import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinkNext from 'next/link'
import SignLayout from "../src/components/SignLayout";
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}))

export default function Login() {
    const classes = useStyles()
    const router = useRouter()
    return (
        <SignLayout title="Вход">
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Эл. почта"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Вход
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link onClick={() => router.back()}>Назад</Link>
                    </Grid>
                    <Grid item>
                        <LinkNext href="/register">
                            <Link variant="body2">
                                {"Нет учётной записи? Зарегистрируйтесь"}
                            </Link>
                        </LinkNext>
                    </Grid>
                </Grid>
            </form>

        </SignLayout>
    )
}