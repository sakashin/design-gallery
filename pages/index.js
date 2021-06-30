import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import Layout from '../components/layout'
import classnames from "classnames";
import utilStyles from '../styles/utils.module.css'
import homeStyles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Date from '../components/date'
import { nameJtoEColor } from '../components/nameJtoE'

export default function Home({ notionTableSchema, notionTableData }) {
  const router = useRouter()
  const routerQueries = router.query; // クエリパラメータを取得

  // 持ち越すパラメータから、値が空のものは削除
  const carryOverQueris = ((routerQueries) => {
    let tempQueries = routerQueries;
    for (let k in tempQueries) {
      if (tempQueries[k] === '') {
        delete tempQueries[k];
      }
    }
    return tempQueries;
  })(routerQueries); 

  // notionテーブルのスキーマから必要な部分だけを抜き出して整形
  const extractedNotionTableSchema = ((properties) => {

    const {'地域': objArea, '大分類': objCategory, 'ストア': objStore, 'URL': objUrl, 'メインカラー': objMaincolor, 'サブカラー': objSubcolor, '制作': objCreator, 'タグ': objTags, 'サムネイル': objThumbnail, '備考': objRemarks} = properties;

    // メインカラー
    const maincolor = ((target) => {
      if (target.length > 0) {
        const tempArray = target.map((elm) => {
          return elm['name']
        })
        return tempArray;
      }
    })(objMaincolor['select']['options']);

    // サブカラー
    const subcolor = ((target) => {
      if (target.length > 0) {
        const tempArray = target.map((elm) => {
          return elm['name']
        })
        return tempArray;
      }
    })(objSubcolor['select']['options']);

    // 地域
    const area = ((target) => {
      if (target.length > 0) {
        const tempArray = target.map((elm) => {
          return elm['name']
        })
        return tempArray;
      }
    })(objArea['select']['options']);

    // 大分類
    const category = ((target) => {
      if (target.length > 0) {
        const tempArray = target.map((elm) => {
          return elm['name']
        })
        return tempArray;
      }
    })(objCategory['select']['options']);

    // 制作
    const creator = ((target) => {
      if (target.length > 0) {
        const tempArray = target.map((elm) => {
          return elm['name']
        })
        return tempArray;
      }
    })(objCreator['select']['options']);

    // タグ
    const tags = ((target) => {
      if (target.length > 0) {
        const tempArray = target.map((elm) => {
          return elm['name']
        })
        return tempArray;
      } else {
        return []
      }
    })(objTags['multi_select']['options']);

    return {
      maincolor,
      subcolor,
      area,
      category,
      creator,
      tags
    }
    
  })(notionTableSchema.properties);

  // notionのデータから必要な部分だけを抜き出して表示用のオブジェクトに整形
  const extractedNotionTableData = notionTableData.map((site) => {
    // id、登録日
    const {id, created_time: createdTime, properties} = site;

    const {'地域': objArea, '大分類': objCategory, 'ストア': objStore, 'URL': objUrl, 'メインカラー': objMaincolor, 'サブカラー': objSubcolor, '制作': objCreator, 'タグ': objTags, 'サムネイル': objThumbnail, '備考': objRemarks} = properties;

    // 地域
    const area = ((target) => {
      if (target !== undefined) {
        return target['select']['name'];
      } else {
        return null;
      }
    })(objArea);

    // 大分類
    const category = ((target) => {
      if (target !== undefined) {
        return target['select']['name'];
      } else {
        return null;
      }
    })(objCategory);
    
    // ストア
    const store = ((target) => {
      if (target.length > 0) {
        return target[0]['plain_text'];
      } else {
        return null;
      }
    })(objStore['rich_text']);
    
    // URL
    const url = ((target) => {
      if (target !== undefined) {
        return target['url'];
      } else {
        return null;
      }
    })(objUrl);

    // メインカラー
    const maincolor = ((target) => {
      if (target !== undefined) {
        return target['select']['name'];
      } else {
        return null;
      }
    })(objMaincolor);

    // サブカラー
    const subcolor = ((target) => {
      if (target !== undefined) {
        return target['select']['name'];
      } else {
        return null;
      }
    })(objSubcolor);

    // 制作
    const creator = ((target) => {
      if (target !== undefined) {
        return target['select']['name'];
      } else {
        return null;
      }
    })(objCreator);

    // タグ
    const tags = ((target) => {
      if (target !== undefined) {
        if (target.length > 0) {
          const names = target.map(element => element['name'])
          return names;
        } else {
          return [];
        }
      }
    })(objTags);
    
    // サムネイル
    // まだAPIで画像ファイルを取得することができない
    // https://stackoverflow.com/questions/67551832/notion-api-how-to-get-the-url-of-uploaded-files
    const thumbnailUrl = ((target) => {
      if (target.length > 0) {
        return target[0]['name'];
      } else {
        return null;
      }
    })(objThumbnail['files']);

    // 備考
    const remarks = ((target) => {
      if (target.length > 0) {
        return target[0]['plain_text'];
      } else {
        return null;
      }
    })(objRemarks['rich_text']);
    
    return {
      id,
      createdTime,
      area,
      category,
      store,
      url,
      maincolor,
      subcolor,
      creator,
      tags,
      thumbnailUrl,
      remarks
    }
  })

  // 表示するデータをフィルタリング
  const filterdAllSiteData = extractedNotionTableData.filter((siteData) => {
    let flug = true;
    for (let k in routerQueries) {
      if (routerQueries[k]) {
        const propertie = siteData[k];
        if(typeof propertie === 'object') {
          if (propertie !== null) {
            const tempArray = propertie.filter((elm) => elm === routerQueries[k]);
            if (tempArray.length == 0) flug = false;
          } else {
            flug = false;
          }
        } else {
          
          if (propertie !== routerQueries[k]) {
            flug = false;
          }
        }
      }
    }
    return flug;
  })

  // 投稿順にソート
  const sortedFilterdAllSiteData = filterdAllSiteData.sort((a, b) => {
    if (a.createdTime < b.createdTime) {
        return 1
    } else {
        return -1
    }
  })
  
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="shopify design garalley" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={homeStyles.filter}>
        {Object.keys(routerQueries).length>0 ? (<div className={homeStyles.filterCancel}><Link href="/">× フィルタリング解除</Link></div>) : ''}
        <sectiion>
          <div className={homeStyles.filterTitle}>メインカラー</div>
          <ul className={classnames(homeStyles.flexBox)}>
          {extractedNotionTableSchema.maincolor.map((color) => (
            <li key={color} className={[homeStyles.colorPicker,  homeStyles[nameJtoEColor(color)], routerQueries['maincolor']===color ? homeStyles.isSelected : ''].join(' ')}>
              <Link href={{pathname: '/', query: { ...carryOverQueris, maincolor: routerQueries['maincolor']===color?undefined:color}}}>{color}</Link>
            </li>
          ))}
          </ul>
        </sectiion>
        <sectiion>
          <div className={homeStyles.filterTitle}>サブカラー</div>
          <ul className={classnames(homeStyles.flexBox)}>
          {extractedNotionTableSchema.maincolor.map((color) => (
            <li key={color} className={[homeStyles.colorPicker,  homeStyles[nameJtoEColor(color)], routerQueries['subcolor']===color ? homeStyles.isSelected : ''].join(' ')}>
              <Link href={{pathname: '/', query: { ...carryOverQueris, subcolor: routerQueries['subcolor']===color?undefined:color}}}>{color}</Link>
            </li>
          ))}
          </ul>
        </sectiion>
        <sectiion>
          <div className={homeStyles.filterTitle}>地域</div>
          <ul className={classnames(homeStyles.flexBox)}>
          {extractedNotionTableSchema.area.map((area) => (
            <li key={area} className={[homeStyles.optionSelector, routerQueries['area']===area ? homeStyles.isSelected : ''].join(' ')}>
              <Link href={{pathname: '/', query: { ...carryOverQueris, area: routerQueries['area']===area?undefined:area}}}>{area}</Link>
            </li>
          ))}
          </ul>
        </sectiion>
        <sectiion>
          <div className={homeStyles.filterTitle}>大分類</div>
          <ul className={classnames(homeStyles.flexBox)}>
          {extractedNotionTableSchema.category.map((category) => (
            <li key={category} className={[homeStyles.optionSelector, routerQueries['category']===category ? homeStyles.isSelected : ''].join(' ')}>
              <Link href={{pathname: '/', query: { ...carryOverQueris, category: routerQueries['category']===category?undefined:category}}}>{category}</Link>
            </li>
          ))}
          </ul>
        </sectiion>
        <sectiion>
          <div className={homeStyles.filterTitle}>制作</div>
          <ul className={classnames(homeStyles.flexBox)}>
          {extractedNotionTableSchema.creator.map((creator) => (
            <li key={creator} className={[homeStyles.optionSelector, routerQueries['creator']===creator ? homeStyles.isSelected : ''].join(' ')}>
              <Link href={{pathname: '/', query: { ...carryOverQueris, creator: routerQueries['creator']===creator?undefined:creator}}}>{creator}</Link>
            </li>
          ))}
          </ul>
        </sectiion>
        <sectiion>
          <div className={homeStyles.filterTitle}>タグ</div>
          <ul className={classnames(homeStyles.flexBox)}>
          {extractedNotionTableSchema.tags.map((tags) => (
            <li key={tags} className={[homeStyles.optionSelector, routerQueries['tags']===tags ? homeStyles.isSelected : ''].join(' ')}>
              <Link href={{pathname: '/', query: { ...carryOverQueris, tags: routerQueries['tags']===tags?undefined:tags}}}>{tags}</Link>
            </li>
          ))}
          </ul>
        </sectiion>
      </nav>
      {Object.keys(routerQueries).length>0 ? (<div className={homeStyles.results}>検索結果：<strong>{sortedFilterdAllSiteData.length}</strong>件</div>) : <div className={homeStyles.results}>登録件数：<strong>{sortedFilterdAllSiteData.length}</strong>件</div>}
      <ul className={homeStyles.grid}>
          {sortedFilterdAllSiteData.map(({ id, createdTime, area, category, store, url, maincolor, subcolor, creator, tags, thumbnailUrl, remarks }) => (
            <li className={homeStyles.card} key={id}>
              <a href={url} target="_blank" rel="noreferrer">
              <figure>
                <div className={homeStyles.thumbnail}><div className={homeStyles.inner}>サムネイル<br />{thumbnailUrl}</div></div>
                <div className={homeStyles.area}>{area}</div>
                <div className={homeStyles.category}>{category}</div>
                <div className={homeStyles.store}>{store}</div>
                <div className={homeStyles.url}>{url}</div>
                <dl className={homeStyles.color}><dt className={homeStyles.mainColor}>メインカラー：</dt><dd><div className={homeStyles[nameJtoEColor(maincolor)]}></div></dd><dt className={homeStyles.subColor}>サブカラー：</dt><dd><div className={homeStyles[nameJtoEColor(subcolor)]}></div></dd></dl>
                <div className={homeStyles.creator}>制作：{creator}</div>
                <div className={homeStyles.tags}>{
                  tags 
                    ? tags.map((tag) => {
                      return <div key={tag嘘} className={homeStyles.tag}>{tag}</div>
                    })
                    : null
                  }</div>
                <div className={homeStyles.remarks}>備考：<br />{remarks}</div>
              </figure>
              </a>
            </li>
          ))}
        </ul>
    </Layout>
  )
}

//const notionDbId = '670cee0a1226461f945d3c1d49bf7623';
const notionDbId = '9f37ce8fa06f40a09bbd37858339c9a5';
const repoUrl = `https://api.notion.com/v1/databases/${notionDbId}`;
//const notionToken = 'secret_wh5KGMoGJU1iAZKGr1qqJFdY68b5rsVa5DqU1DsKiqW';
const notionToken = 'secret_HUdyR5w932ph6cVGCBSWFi8CYPX5Mi8JR3f2AGdod32';
export async function getStaticProps() {

  // notion テーブルスキーマを取得
  const notionTableSchema = await fetch(repoUrl, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13'
    }
  })
  .then((r) => r.json());

  // notionデータを取得（１度に100件しかとってこれない）
  /*
  const notionSitesData = await fetch(repoUrl+'/query', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13'
    },
    body: JSON.stringify({page_size: 15})
  })
  .then((r) => r.json());
  */

  // notionデータを取得　その２（全て取得する）
  let notionTableData = []
  let hasMore = true           // 次のページがあるかどうか
  let startCursor = undefined　// カーソル
  while (hasMore) {  // 次のページがあるかぎり実行
    const getNotionTableData = await fetch(repoUrl+'/query', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${notionToken}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2021-05-13'
        },
        body: JSON.stringify({ start_cursor: startCursor }) // start_cursor 付きのデータを送信
      })
    const response = await getNotionTableData.json();  // レスポンスを取得
    startCursor = response.next_cursor               // カーソルを更新
    hasMore = response.has_more                      // カーソルを更新
    notionTableData = [...notionTableData, ...response.results]            // これまでのデータとマージ
  }

  return {
    props: {
      notionTableSchema,
      notionTableData
    }
  }
}

