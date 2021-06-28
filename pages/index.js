import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedSitesData } from '../lib/sites'
import Link from 'next/link';

export default function Home({ allSitesData }) {
  console.log(allSitesData);
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="shopify design garalley" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className={utilStyles.list}>
          {allSitesData.map(({ id, internal, category, title, url, date, maincolor, subcolor, tags, remarks, thumbnailUrl }) => (
            <li className={utilStyles.listItem} key={id}>
              <figure>
                <div>
                <a href={url} target="_blank" rel="noreferrer"><img src={thumbnailUrl} alt={title} width={300} height={500} /></a>
                  <div className="post_inner">
                    <p className="post_inner--date">{date}</p>
                    <div className="post_inner--description"><p>{remarks}</p></div>
                    <p className="post_inner--category">{category}</p>
                    <p className="post_inner--detail"><a href={url} aria-label="Detail"></a></p>
                  </div>
                </div>
                <figcaption className="post_title"><h3><Link href={`/sites/${id}`}><a>{ title }</a></Link></h3></figcaption>
                <p className="post_url">{url}</p>
              </figure>
            </li>
          ))}
        </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const allSitesData = getSortedSitesData()
  return {
    props: {
      allSitesData
    }
  }
}
