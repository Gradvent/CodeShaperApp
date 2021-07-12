import { createTheme } from "@material-ui/core";
import { red, blue, orange, green } from "@material-ui/core/colors";


export const theme = createTheme({
    palette: {
        primary: {
            main: orange.A400,
        },
        secondary: {
            main: green.A100,
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff'
        }
    }
})

export const themeDark = createTheme({
    palette: {
        primary: {
            main: orange[900],
        },
        secondary: {
            main: green[800],
        },
        error: {
            main: red[800]
        },
        background: {
            default: '#222'
        }
    }
})

export default theme
