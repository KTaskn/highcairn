import React from 'react'
import Head from 'next/head'
import {AppProps} from 'next/app'
import style from '../styles/pages/_app.module.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return <div>
    <Head>
      <title>{process.env.TITLE}</title>
    </Head>
    <h1 className={style.title}><a href="/">{process.env.TITLE}</a></h1>
    <Component {...pageProps}/>
    </div>
}

export default App