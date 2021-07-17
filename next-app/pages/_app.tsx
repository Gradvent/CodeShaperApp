import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from '../src/theme'
import { UserContext, UserData } from '../src/user'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useApiClient } from '../src/api_client'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles)
  })
  const router = useRouter()
  const [user, setUser] = useState<UserData>(undefined)
  const fetchUser = (redirect = false) => {
    const [apiClient, fetchApi] = useApiClient()
    const logout = () => {
      fetchApi.then((pre_) => {
        apiClient.post('/logout').then((res) => {
          setUser(undefined)
          router.push('/')
        }).catch(() => setUser(undefined))
      })
    }
    fetchApi.then((pre_) => {
      apiClient.get('/api/user').then((res) => {
        setUser({ logged: true, logout, ...res.data })
        if (redirect) router.push('/')
      }).catch(() => setUser(undefined))
    })
  }
  React.useEffect(() => {
    if (!!user) return
    fetchUser()
  }, [user])

  return <React.Fragment>
    <Head>
      <title>CodeShaper</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContext.Provider value={user}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeProvider>
  </React.Fragment>
}
export default MyApp
