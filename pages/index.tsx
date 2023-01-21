import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import axios from 'axios'

export type Article = {
  title: string
  description: string
}
type Articles = Map<number, Article>

type props = {
  articles: Articles
}

export default function Home(props: props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {Array.from(props.articles).map(article => {
            let [id, content] = article
          
            return <li className={utilStyles.listItem} key={id}>
              <Link href={`/${id}`}>{content.title}</Link>
            </li>
          })}
        </ul>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`${process.env.HOST}/v1/articles`)
  const articles = Object.entries(response.data)

  return {
    props: {
      articles
    }
  }
};