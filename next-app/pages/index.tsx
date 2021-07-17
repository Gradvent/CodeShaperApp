import React from 'react';

import 'highlight.js/styles/default.css'
import AppLayout from '../src/components/AppLayout';
import PastaEditor from '../src/components/PastaEditor';
import { Grid } from '@material-ui/core';
import PastaList, { PastaItem } from '../src/components/PastaList';
import Head from 'next/head';
import { fetchMyLast10Pasta, fetchPublicLast10Pasta } from '../src/api_client';


export default function Home() {
  const [publicList, setPublicList] = React.useState<PastaItem[]>([])
  const [myList, setMyList] = React.useState<PastaItem[]>([])
  const [myListMessage, setMyListMessage] = React.useState('')
  React.useEffect(()=>{
    fetchPublicLast10Pasta().then(setPublicList)
    fetchMyLast10Pasta().then((data)=>{
      if (data) setMyList(data)
      else setMyListMessage("Для просмотра нужна авторизация")
    })
  }, [])
  return (
    <AppLayout>
      <Head>
        <title>CodeShaper</title>
        <meta name="description" content="CodeShaper help you shape code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PastaEditor />
        </Grid>
        <Grid item xs={12} md={4}>
          <PastaList list={publicList} title="Последние публичные"/>
        </Grid>
        <Grid item xs={12} md={4}>
          {!!myList.length && 
            <PastaList list={myList} title="Ваша паста"/>}
        </Grid>
      </Grid>
    </AppLayout>
  )
}
