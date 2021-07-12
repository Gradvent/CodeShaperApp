import { Card, CardHeader, Grid, List, ListItem } from "@material-ui/core"

export interface PastaItem {
    title: string
    lang: string
    user?: string
    datetime: string
    shortLink: string
}

export interface PastaListProps {
    title: string,
    list: PastaItem[]
}

export default function PastaList(props: PastaListProps) {
    return <Card>
        <CardHeader title={props.title}/>
        <List>
            {props.list.map((item)=>(<ListItem key={item.shortLink} button component="a" href={item.shortLink}>
                <Grid>
                    <Grid item>{item.title}</Grid>
                    <Grid item>{item.lang}</Grid>
                    <Grid item>{item.datetime}</Grid>
                </Grid>
                
            </ListItem>))}
        </List>
    </Card>
}