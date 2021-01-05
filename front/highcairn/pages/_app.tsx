import React from 'react'
import Head from 'next/head'
import {AppProps} from 'next/app'
import style from '../styles/pages/_app.module.scss'

const App = ({ Component, pageProps }: AppProps) => {
  const gtm_head_query = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','` + process.env.GOOGLE_TAG_MANAGER + "');"

  const gtm_body_query = '<iframe src="https://www.googletagmanager.com/ns.html?id=' + process.env.GOOGLE_TAG_MANAGER + '" height="0" width="0" style="display:none;visibility:hidden"></iframe>'

  return <div>
    <Head>
      <title>{process.env.TITLE}</title>
      <script dangerouslySetInnerHTML={{
        __html: gtm_head_query
      }}></script>
    </Head>

    <noscript dangerouslySetInnerHTML={{
      __html: gtm_body_query
    }}></noscript>

    <h1 className={style.title}><a href="/">{process.env.TITLE}</a></h1>
    <Component {...pageProps}/>
    </div>
}

export default App