import React from 'react';

import 'highlight.js/styles/default.css'
import AppLayout from '../src/components/AppLayout';
import PastaEditor from '../src/components/PastaEditor';
import { Grid } from '@material-ui/core';
import PastaList, { PastaItem } from '../src/components/PastaList';
import Head from 'next/head';

const list: PastaItem[] = [
  {
    title: "Hello world from Python",
    lang: "python",
    user: "",
    datetime: new Date().toLocaleString(),
    shortLink: "/pasta/9362984"
  },
  {
    title: "Hello world from Python 2",
    lang: "python",
    user: "",
    datetime: new Date().toLocaleString(),
    shortLink: "/pasta/9362985"
  },
]

export default function Home() {
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
          <PastaList title="Последние публичные" list={list}/>
        </Grid>
      </Grid>
    </AppLayout>
  )
}
