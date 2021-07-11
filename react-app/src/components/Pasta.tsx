import { Card, CardHeader, makeStyles, Typography, CardContent } from "@material-ui/core"
import hljs from 'highlight.js'
import React from "react"
import { useEffect } from "react"

export interface PastaProps {
    title?: string
    lang?: string
    children?: any
    user?: string,
    datetime?: string 
}

const useStyles = makeStyles((theme) => ({
    pastaCard: {
        margin: 5
    },
    footer: {
        padding: "0px 16px 8px 16px" 
    }
}))

export default function Pasta(props: PastaProps) {
    const {title="Без названия", 
        children, lang="plaintext",
        datetime=new Date().toLocaleString()} = props
    const ref = React.useRef<HTMLPreElement>(null)
    const classes = useStyles()
    useEffect(()=>{
        ref.current?.querySelectorAll<HTMLElement>('pre code')
            .forEach((node)=>hljs.highlightElement(node))
    }, [ref, children])
    return (
        <Card title={title} className={classes.pastaCard}>
            <CardHeader title={title}
                subheader={lang ?? "text"}/>
            <pre ref={ref}><code className={`language-${lang}`}>{children}</code></pre>
            <div className={classes.footer}><Typography>{props.user ? <a href={`/user/${props.user}`}>{props.user}</a> : "Гость"} в {datetime}</Typography></div>
        </Card>
        
    )
}