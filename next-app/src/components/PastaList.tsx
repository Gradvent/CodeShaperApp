import { Button, Card, CardHeader, Grid, List, ListItem } from "@material-ui/core"
import { Pagination } from '@material-ui/lab'
import axios from "axios"
import { useEffect, useState } from "react"
import { useApiClient } from "../api_client"

export interface PastaItem {
    title: string
    lang: string
    user?: string
    datetime: string
    short: string
}

export interface PastaListProps {
    title: string,
    list: PastaItem[]
}

export default function PastaList(props: PastaListProps) {
    return <Card>
        <CardHeader title={props.title} />
        <List>
            {props.list.map((item) => (<ListItem key={item.short} button component="a" href={`/pasta/${item.short}`}>
                <Grid>
                    <Grid item>{item.title}</Grid>
                    <Grid item>{item.lang}</Grid>
                    <Grid item>{item.datetime}</Grid>
                </Grid>
            </ListItem>))}
        </List>
    </Card>
}

export interface PaginatedPastaListProps extends PastaListProps {
    page: number,
    pages: number
    changePage: (page: number) => void
}

export function PaginatedPastaList(props: PaginatedPastaListProps) {
    const { page, pages, changePage } = props
    const pageList = []
    const left = Math.max(1, page - 3)
    const right = Math.min(pages, page + 3)
    for (let i = left; i <= right; i++) pageList.push(i)

    return <Card>
        <CardHeader title={props.title} />
        <List>
            {props.list.map((item) => (<ListItem key={item.short} button component="a" href={`/pasta/${item.short}`}>
                <Grid>
                    <Grid item>{item.title}</Grid>
                    <Grid item>{item.lang}</Grid>
                    <Grid item>{item.datetime}</Grid>
                </Grid>
            </ListItem>))}
        </List>
        <Grid container justifyContent="center">
            <Grid item>
                <Pagination count={pages} page={page} onChange={(_, page) => changePage(page)} />
            </Grid>
        </Grid>
    </Card>
}