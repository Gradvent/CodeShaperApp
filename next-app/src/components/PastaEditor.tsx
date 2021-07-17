import {
    Card, Button, Typography, TextField, MenuItem, FormControlLabel,
    makeStyles, Grid, FormControl, InputLabel, Select, Checkbox
} from "@material-ui/core"
import React from "react"
import { useState } from "react"
import CodeViewer from "./CodeViewer"
import axios from 'axios'
import { useRouter } from "next/router"
import { UserContext, UserData } from "../user"

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: "0px 16px 8px 16px"
    },
    codeBlock: {
        margin: theme.spacing(2)
    }
}))

type AccessType = 'public' | 'unlisted' | 'private'
type ExpType = 'H' | 'm' | 'D' | 'W' | 'M'

export default function PastaEditor() {
    const [title, setTitle] = useState("Без названия")
    const [code, setCode] = useState("")
    const [lang, setLang] = useState("plaintext")
    const [loading, setLoad] = useState(false)
    const [access, setAccess] = useState<AccessType>('public')
    const [withExpTime, setWithExpTime] = useState(false)
    const [expNumber, setExpNumber] = useState<number>(10)
    const [expType, setExpType] = useState<ExpType>('m')
    const [withUser, setWithUser] = useState(false)
    const classes = useStyles()
    const router = useRouter()

    const send = async (user?: UserData) => {
        const pre_request = await axios.get('sanctum/csrf-cookie')
        setLoad(true)
        let accessData = {}
        if (withUser && user) accessData = { user_id: user?.id, access }
        else if (access == 'private') accessData = { access: 'unlisted' }
        else accessData = { access }
        let expData
        if (withExpTime) expData = {exp: `${expNumber} ${expType}`} 
        else expData = {}
        const data = {
            title,
            lang,
            textcode: code,
            ...accessData,
            ...expData
        }

        const result = await axios.post('/api/pasta', data)
        const json = result.data
        router.push(`/pasta/${json.data.short}`)
        setLoad(false)
    }

    const accessChange = (event: any) => {
        setAccess(event.target.value)
    }
    const withExpChange = (event: any, checked: boolean) => {
        setWithExpTime(checked)
    }
    const expNumberChange = (event: any) => {
        const value = event.target.value
        if (value) setExpNumber(value)
        else setExpNumber(0)
    }
    const expTypeChange = (event: any) => {
        const value = event.target.value
        if (value) setExpType(value)
        else setExpType('m')
    }

    const withUserChange = (event: any) => {
        if (event.target.value == 'false') {
            if (access == 'private') setAccess('unlisted')
            setWithUser(false)
        } else if (event.target.value == 'true') setWithUser(true)
    }
    return (
        <Card>
            <div className={classes.codeBlock}>
                <UserContext.Consumer>
                    {(user) => (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Заголовок" fullWidth
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <TextField fullWidth value={lang} onChange={(e) => setLang(e.target.value)}
                                            label="Lang" />
                                    </Grid>

                                    {!!user && <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel id="access-select-label">Отправить как</InputLabel>
                                            <Select
                                                labelId="access-user-select-label"
                                                id="access-select"
                                                value={withUser}
                                                onChange={withUserChange}
                                            >
                                                <MenuItem value='true'>Автор</MenuItem>
                                                <MenuItem value='false'>Анонимно</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>}
                                    <Grid item xs>
                                        <FormControl fullWidth>
                                            <InputLabel id="access-select-label">Доступ</InputLabel>
                                            <Select
                                                labelId="access-select-label"
                                                id="access-select"
                                                value={access}
                                                onChange={accessChange}
                                            >
                                                <MenuItem value='public'>Публичный</MenuItem>
                                                <MenuItem value='unlisted'>По ссылке</MenuItem>
                                                {!!user && withUser && <MenuItem value='private'>Приватный</MenuItem>}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <FormControlLabel
                                            labelPlacement="start"
                                            control={<Checkbox checked={withExpTime} 
                                               onChange={withExpChange} name="exptime" />}
                                            label="Срок жизни"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField disabled={!withExpTime} fullWidth type="number" 
                                            value={expNumber} onChange={expNumberChange} />
                                    </Grid>
                                    <Grid item xs>
                                        <Select fullWidth disabled={!withExpTime}
                                            labelId="et-select-label"
                                            id="et-select"
                                            value={expType}
                                            onChange={expTypeChange}
                                        >
                                            <MenuItem value='m'>Минут</MenuItem>
                                            <MenuItem value='H'>Часов</MenuItem>
                                            <MenuItem value='D'>Дней</MenuItem>
                                            <MenuItem value='W'>Недель</MenuItem>
                                            <MenuItem value='M'>Месяцев</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" multiline fullWidth label="Code"
                                    onChange={(e) => setCode(e.target.value)} value={code}
                                    maxRows={15} />

                            </Grid>
                            <Grid item xs={12}>
                                <CodeViewer lang={lang}>{code}</CodeViewer>
                            </Grid>
                            <Grid item xs={12}>
                                <Button disabled={loading} onClick={() => send(user)}>
                                    Отправить
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </UserContext.Consumer>
            </div>
        </Card>
    )
}