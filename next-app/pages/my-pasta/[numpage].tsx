import React, { useEffect, useState } from 'react';
import 'highlight.js/styles/default.css'
import AppLayout from '../../src/components/AppLayout';
import { Grid } from '@material-ui/core';
import PastaList, { PaginatedPastaList, PastaItem } from '../../src/components/PastaList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { fetchMyLast10Pasta, fetchMyPasta, fetchPageMyPasta, fetchPublicLast10Pasta } from '../../src/api_client';
import { UserContext } from '../../src/user';
import Redirect from '../../src/components/Redirect';


export default function MyPastaPage() {
  const router = useRouter()
  let { numpage } = router.query
  let short = ""
  if (Array.isArray(numpage))
    numpage = numpage[0]
  else if (typeof (numpage) == 'string')
    numpage = numpage

  const [page, setPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)
  const [pastaList, setPastaList] = useState<PastaItem[]>([])
  const [publicList, setPublicList] = useState<PastaItem[]>([])
  const [myList, setMyList] = useState<PastaItem[]>([])
  useEffect(() => {
    fetchPublicLast10Pasta().then(setPublicList)
    fetchMyLast10Pasta().then((data)=>{
      if (data) setMyList(data)
      else setMyList([])
    })
  }, [])
  useEffect(() => {
    fetchPageMyPasta(page).then((data) => {
      setPastaList(data.data)
      setPages(data.pages)
    })
  }, [page])

  return (
    <AppLayout>
      <Head>
        <title>CodeShaper | My pasta</title>
        <meta name="description" content="CodeShaper help you shape code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <UserContext.Consumer>
          {(user) => user ? <React.Fragment>
            <Grid item xs={12} md={8}>
              <PaginatedPastaList title="Ваша паста"
                changePage={setPage} list={pastaList} {...{ page, pages }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PastaList list={publicList} title="Последние публичные" />
            </Grid>
            {/*myList.length && <Grid item xs={12} md={4}>
                <PastaList list={myList} title="Ваша паста"/>
              </Grid>*/}
          </React.Fragment> : <div>Для просмотра нужна <a href="/login">авторизация</a></div>}
        </UserContext.Consumer>

      </Grid>
    </AppLayout>
  )
}