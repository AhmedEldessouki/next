import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <React.Fragment>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </React.Fragment>
      </Head>
      <nav>
        <Link href="/static">Static</Link>
      </nav>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Link href="/static">Static</Link>
        It's Runnin
      </main>
    </div>
  )
}

export default Home
