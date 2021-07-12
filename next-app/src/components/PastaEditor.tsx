import { Card, CardHeader, Typography, CardContent, TextField, makeStyles, Grid } from "@material-ui/core"
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
    const classes = useStyles()

    return (
        <Card>
            <CardHeader title={
                <TextField label="Заголовок" fullWidth variant="outlined" onChange={(e) => setTitle(e.target.value)} value={title} />}/>
            <div className={classes.codeBlock}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField value={lang} onChange={(e)=>setLang(e.target.value)}
                        label="Lang"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" multiline fullWidth label="Code"
                            onChange={(e) => setCode(e.target.value)} value={code}
                            maxRows={15}/>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <CodeViewer lang={lang}>{code}</CodeViewer>
                    </Grid>
                </Grid>          
            </div>
        </Card>
    )
}