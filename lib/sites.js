import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fetch from 'node-fetch'

const sitesDirectory = path.join(process.cwd(), 'sites');

export const getSortedSitesData = () => {
    // Sites配下のファイル名を取得する
    const fileNames = fs.readdirSync(sitesDirectory);

    const allSitesData = fileNames.map(fileName => {
        // id を取得するためにファイル名から ".md" を削除する
        const id = fileName.replace(/\.md$/, '');

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(sitesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // 投稿のメタデータ部分を解析するために gray-matter を使う
        const matterResult = matter(fileContents);

        // データを id と合わせる
        return {
            id,
            ...matterResult.data
        }
    });

    // 投稿を日付でソートする
    return allSitesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export const getAllSiteIds = () => {
    // Sites配下のファイル名を取得する
    const fileNames = fs.readdirSync(sitesDirectory)

    // 以下のような配列を返します:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
          params: {
            id: fileName.replace(/\.md$/, '')
          }
        }
    })
}

export const getSiteData = (id) => {
    const fullPath = path.join(sitesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents);

    // データを id と組み合わせる
    return {
        id,
        ...matterResult.data
    }
}


