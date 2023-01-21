import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'

export default function Custom404() {
  return <Layout>
    <Head>
      <title>Not Found</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>Not Found</h1>
      <p>The article that you are looking for is not found.</p>
    </article>
  </Layout>
}