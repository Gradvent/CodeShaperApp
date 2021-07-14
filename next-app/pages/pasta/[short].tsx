import React from 'react';
import 'highlight.js/styles/default.css'
import AppLayout from '../../src/components/AppLayout';
import Pasta from '../../src/components/Pasta';
import { Grid } from '@material-ui/core';
import PastaList, { PastaItem } from '../../src/components/PastaList';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function PastaPage() {
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
          <PastaList title="Последние публичные"/>
        </Grid>
      </Grid>
    </AppLayout>
  )
}