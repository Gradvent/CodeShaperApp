import { Card, Button, Typography, CardContent, TextField, makeStyles, Grid } from "@material-ui/core"
import hljs from 'highlight.js'
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import CodeViewer from "./CodeViewer"

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: "0px 16px 8px 16px"
    },
    codeBlock: {
        margin: theme.spacing(2)
    }
}))

export default function PastaEditor() {
    const [title, setTitle] = useState("Без названия")
    const [code, setCode] = useState("")
    const [lang, setLang] = useState("plaintext")
    const [loading, setLoad] = useState(false)
    const classes = useStyles()

    const send = async () => {
        const pre_request = await fetch('sanctum/csrf-cookie')
        if (!pre_request.ok) return
        setLoad(true)
        const result = await fetch('/api/pasta', {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                title, 
                lang,
                textcode:code
            })
        })
        setLoad(false)
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
                    <Grid item xs={12}>
                        <TextField value={lang} onChange={(e) => setLang(e.target.value)}
                            label="Lang" />
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
                        <Button disabled={loading} onClick={()=>send()}>
                            Отправить
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Card>
    )
}