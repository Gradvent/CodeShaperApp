import { useState } from "react";
import AppMainLayout from "../components/AppMainLayout";
import createPage from "./BasePage";

export function Home(pageProps) {
    const [count, setCount] = useState(0)
    return (
        <AppMainLayout>
            <div>Home Page</div>
            <div>Clicked {count}</div>
            <button onClick={()=>setCount(count+1)}>Click</button>
        </AppMainLayout>
    )
}

export default createPage(Home).mountToElementById('home-page')