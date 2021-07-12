import { Card, CardHeader, Typography, CardContent } from "@material-ui/core"
import hljs from 'highlight.js'
import React from "react"
import { useEffect } from "react"
import { makeStyles } from '@material-ui/styles'
import CodeViewer from "./CodeViewer"

export interface PastaProps {
    title?: string
    lang?: string
    children?: any
    user?: string,
    datetime?: string 
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: "0px 16px 8px 16px" 
    }
}))

export default function Pasta(props: PastaProps) {
    const {title="Без названия", 
        children, lang="plaintext",
        datetime=new Date().toLocaleString()} = props
    const classes = useStyles()
    return (
        <Card title={title}>
            <CardHeader title={title}
                subheader={lang ?? "text"}/>
            <CodeViewer lang={lang}>{children}</CodeViewer>
            <div className={classes.footer}><Typography>{props.user ? <a href={`/user/${props.user}`}>{props.user}</a> : "Гость"} в {datetime}</Typography></div>
        </Card>
        
    )
}