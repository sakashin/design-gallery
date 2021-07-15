import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = "Shopify Design Clip";

export default function Layout({ children, home }) {
    return (
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="shopifyで作成されたサイトのクリップ集"
          />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          <h2 className={utilStyles.headingLg}>Shopifyで作成されたサイトのクリップ集</h2>
          <h1 className={utilStyles.headingLg}>
              <Link href="/">
              <a className={utilStyles.colorInherit}>{siteTitle}</a>
              </Link>
          </h1>
          <p>
            ※サーバリソース消費を無料利用の範囲内に収めるため、現在サムネイル表示を一時停止しています。環境移行が完了次第再開します。
          </p>
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    )
  }