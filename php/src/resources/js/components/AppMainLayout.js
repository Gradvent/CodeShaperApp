import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import Header from "./Header";


export default function AppMainLayout(props) {
    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title={props.title ?? 'CodeShaper'}/>
            <main>
                {props.children}
            </main>
        </Container>
    </React.Fragment>
    )
}