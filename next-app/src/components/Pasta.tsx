import { Card, CardHeader, Typography, TextField, LinearProgress } from "@material-ui/core"
import React from "react"
import { useEffect } from "react"
import { makeStyles } from '@material-ui/styles'
import CodeViewer from "./CodeViewer"
import axios from "axios"
import { useState } from "react"
import Error from 'next/error'

export interface PastaData {
    id: number,
    created_at: string
    user_id?: number
    title: string
    textcode: string
    lang: string
    access: string
    short: string
}
export interface PastaProps {
    short: string
}

interface BackendMassage {
    success: boolean
    data: PastaData
    message: string
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: "0px 16px 8px 16px"
    }
}))



export default function Pasta(props: PastaProps) {
    const [error, setError] = useState<number | null>(null)
    const [loading, setLoad] = useState(false)
    const [shortLink, setShortLink] = useState('')
    const [data, setData] = useState<PastaData | undefined>(undefined)
    useEffect(() => {
        setLoad(true)

        const http_client = axios.create({ baseURL: window.origin })
        http_client.get('sanctum/csrf-cookie').then(async (pre_) => {
            try {
                const res = await http_client.get<BackendMassage>(`/api/pasta/${props.short}`)
                if (res.status != 200) {
                    setError(res.status)
                    return
                }
                setData(res.data.data)
                setShortLink(new URL(`/pasta/${res.data.data.short}`, window.origin).href)
            } catch (e) {
                setError(404)
            } finally {
                setLoad(false)
            }
        })
    }, [props.short])
    const classes = useStyles()
    const selectLink: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
        e.target.select()
    }
    return <Card>{!!error ? <Error statusCode={error} /> : <>
        {loading && <LinearProgress />}
        <CardHeader title={data?.title ?? "Без названия"}
            subheader={data?.lang ?? "plaintext"} />
        <CodeViewer lang={data?.lang ?? "plaintext"}>
            {data?.textcode ?? ""}
        </CodeViewer>
        <div className={classes.footer}>
            <Typography>
                {data?.user_id ?
                    <a href={`/user/${data.user_id}`}>Автор</a> :
                    "Гость"} в {data?.created_at}
            </Typography>
            <TextField fullWidth onFocus={selectLink} label="Ссылка на пасту" value={shortLink} />
        </div></>}
    </Card>
}
