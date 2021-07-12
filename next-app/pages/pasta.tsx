import React from 'react';
import 'highlight.js/styles/default.css'
import AppLayout from '../src/components/AppLayout';
import Pasta from '../src/components/Pasta';
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
    title: "Hello world from Python",
    lang: "python",
    user: "",
    datetime: new Date().toLocaleString(),
    shortLink: "/pasta/9362984"
  },
]

export default function PastaPage() {
  return (
    <AppLayout>
      <Head>
        <title>CodeShaper | pasta</title>
        <meta name="description" content="CodeShaper help you shape code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Pasta />
        </Grid>
        <Grid item xs={12} md={4}>
          <PastaList title="Последние публичные" list={list}/>
        </Grid>
      </Grid>
    </AppLayout>
  )
}