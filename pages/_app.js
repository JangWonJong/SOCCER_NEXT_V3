import '@/styles/globals.css'
import { wrapper } from '@/modules/store'
import { Footer, Header, Layout, Nav } from '@/components'

const App = ({ Component, pageProps }) => {
  return (<>
    <Nav/>
      <Header/>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      <Footer/>
    </>)
}

export default wrapper.withRedux (App)
