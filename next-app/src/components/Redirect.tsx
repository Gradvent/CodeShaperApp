import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Redirect(props: {to:string, message:string}) {
    const router = useRouter()
    useEffect(()=>{
        router.push(props.to)
    })
    return <div>{props.message}</div>
}