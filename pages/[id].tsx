import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { Article } from './index'
import Custom404 from './404'

type props = {
  article: Article
}

export default function Post(props: props) {
  if (props.article === undefined) {
    return (
      <Custom404 />
    )
  }
  return (
    <Layout>
      <Head>
        <title>{props.article.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{props.article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.article.description }} />
      </article>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await axios.get(`${process.env.HOST}/v1/articles/${params?.id}`)
    const article = Object.entries(response.data)[0][1]

    return {
      props: {
        article
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {}
    }
  }
}
