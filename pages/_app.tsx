import {UserProvider} from '../context/userContext'
import type {AppProps /*, AppContext */} from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
