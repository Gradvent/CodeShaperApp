import { Card, Button, Typography, TextField, MenuItem,
    makeStyles, Grid, FormControl, InputLabel, Select } from "@material-ui/core"
import hljs from 'highlight.js'
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import CodeViewer from "./CodeViewer"
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: "0px 16px 8px 16px"
    },
    codeBlock: {
        margin: theme.spacing(2)
    }
}))

type AccessType = 'public'|'unlisted'|'private'

export default function PastaEditor() {
    const [title, setTitle] = useState("Без названия")
    const [code, setCode] = useState("")
    const [lang, setLang] = useState("plaintext")
    const [loading, setLoad] = useState(false)
    const [access, setAccess] = useState<AccessType>('public')
    const [slink, setSlink] = useState('')
    const classes = useStyles()

    const send = async () => {
        const pre_request = await axios.get('sanctum/csrf-cookie')
        setLoad(true)
        const result = await axios.post('/api/pasta', {
            title,
            lang,
            textcode: code,
            access,
        })
        const json = result.data
        if (json.data.access != 'private') {
            const l = new URL(`/pasta/${json.data.id}`, document.baseURI)
            setSlink(()=>l.href)
        } else setSlink('')
        console.log(json)
        setLoad(false)
    }

    const accessChange = (event: any) => {
        setAccess(event.target.value)
    }

    return (
        <Card>
            <div className={classes.codeBlock}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField label="Заголовок" fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            value={title} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={lang} onChange={(e) => setLang(e.target.value)}
                            label="Lang" />
                    </Grid>
                    <Grid item xs={6}>
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
                                <MenuItem value='private'>Приватный</MenuItem>
                            </Select>
                        </FormControl>
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
                        <Button disabled={loading} onClick={() => send()}>
                            Отправить
                        </Button>
                    </Grid>
                    {!!slink && <Grid item xs={12}>
                        <TextField fullWidth label="Ссылка на пасту">
                            {slink}
                        </TextField>
                    </Grid>}
                </Grid>
            </div>
        </Card>
    )
}