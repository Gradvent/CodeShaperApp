import { Card, CardHeader, Typography, CardContent, LinearProgress } from "@material-ui/core"
import React from "react"
import { useEffect } from "react"
import { makeStyles } from '@material-ui/styles'
import CodeViewer from "./CodeViewer"
import axios from "axios"
import { useState } from "react"

export interface PastaData {
    id: number,
    created_at: string
    user_id: number
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
    const [loading, setLoad] = useState(false)
    const [data, setData] = useState<PastaData|undefined>(undefined)
    useEffect(()=>{
        setLoad(true)
        
        const http_client = axios.create({baseURL: window.origin})
        http_client.get('sanctum/csrf-cookie').then((pre_) => {
            http_client.get<BackendMassage>(`/api/pasta/${props.short}`).then((res)=>{
                setData(res.data.data)
            }).finally(()=>setLoad(false))
        })
    }, [props.short])
    const classes = useStyles()
    return (
        <Card>
            {loading && <LinearProgress />}
            <CardHeader title={data?.title ?? "Без названия"}
                subheader={data?.lang ?? "plaintext"}/>
            <CodeViewer lang={data?.lang ?? "plaintext"}>{data?.textcode ?? ""}</CodeViewer>
            <div className={classes.footer}><Typography>{data?.user_id ? <a href={`/user/${data.user_id}`}>Автор</a> : "Гость"} в {data?.created_at}</Typography></div>
        </Card>
        
    )
}