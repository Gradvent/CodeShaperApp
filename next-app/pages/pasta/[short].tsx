import React, { useEffect, useState } from 'react';
import 'highlight.js/styles/default.css'
import AppLayout from '../../src/components/AppLayout';
import Pasta, { PastaData } from '../../src/components/Pasta';
import { Grid } from '@material-ui/core';
import PastaList, { PastaItem } from '../../src/components/PastaList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { fetchMyLast10Pasta, fetchPublicLast10Pasta } from '../../src/api_client';


export default function PastaPage() {
  const [publicList, setPublicList] = useState<PastaItem[]>([])
  const [myList, setMyList] = useState<PastaItem[]>([])
  useEffect(()=>{
    fetchPublicLast10Pasta().then(setPublicList)
    fetchMyLast10Pasta().then((data)=>{
      if (data) setMyList(data)
      else setMyList([])
    })
  }, [])
  const router = useRouter()
  const { short:q_short } = router.query
  let short = ""
  if (Array.isArray(q_short))
    short = q_short[0]
  else if (typeof(q_short) == 'string')
    short = q_short
  return (
    <AppLayout>
      <Head>
        <title>CodeShaper | pasta</title>
        <meta name="description" content="CodeShaper help you shape code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Pasta short={short}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <PastaList list={publicList} title="Последние публичные"/>
        </Grid>
        {!!myList.length && <Grid item xs={12} md={4}>
          <PastaList list={myList} title="Ваша паста"/>
        </Grid>}
      </Grid>
    </AppLayout>
  )
}