import hljs from "highlight.js"
import React, { useEffect, useRef } from "react"

export interface CodeProps {
    lang?: string
    children?: any
}

export default function CodeViewer({ lang, children }: CodeProps) {
    const ref = useRef<HTMLPreElement>(null)
    useEffect(() => {
        ref.current?.querySelectorAll<HTMLElement>('pre code')
            .forEach((node) => hljs.highlightElement(node))
    }, [ref, children])
    return (
        <pre ref={ref}><code className={`language-${lang}`}>{children}</code></pre>
    )
}
