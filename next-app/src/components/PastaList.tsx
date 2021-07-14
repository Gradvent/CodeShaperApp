import { Card, CardHeader, Grid, List, ListItem } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"

export interface PastaItem {
    title: string
    lang: string
    user?: string
    datetime: string
    short: string
}

export interface PastaListProps {
    title: string
}

export default function PastaList(props: PastaListProps) {
    const [loading, setLoad] = useState(false)
    const [list, setList] = useState<PastaItem[]>([])
    useEffect(() => {
        const http_client = axios.create({baseURL: window.origin})
        http_client.get('sanctum/csrf-cookie').then((pre_) => {
            setLoad(true)
            http_client.get('/api/pasta').then((res) => {
                const json = res.data
                setList(()=>json.data)
                setLoad(false)
            })
        })
    }, [])
    return <Card>
        <CardHeader title={props.title} />
        <List>
            {list.map((item) => (<ListItem key={item.short} button component="a" href={`/pasta/${item.short}`}>
                <Grid>
                    <Grid item>{item.title}</Grid>
                    <Grid item>{item.lang}</Grid>
                    <Grid item>{item.datetime}</Grid>
                </Grid>

            </ListItem>))}
        </List>
    </Card>
}