import Layout from "../../components/layout";
import { getAllSiteIds, getSiteData } from '../../lib/sites';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css'

const Site = ({ siteData }) => {
    const {
        id,
        internal, 
        category, 
        title, 
        url, 
        thumbnailUrl, 
        date, 
        maincolor, 
        subcolor, 
        tags, 
        remarks,
    } = siteData;

    return (
        <Layout>
            {id}<br />
            {internal} <br />
            {category} <br />
            {title} <br />
            {url} <br />
            {thumbnailUrl} <br />
            {date} <br />
            {maincolor} <br />
            {subcolor} <br />
            {tags.map((a)=>{
                {a}<br />
            })}
            {remarks}<br />
        </Layout>
    )
}
export default Site;

export async function getStaticPaths() {
    const paths = getAllSiteIds();
    // id としてとりうる値のリストを返す
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // params.id を使用して、ブログの投稿に必要なデータを取得する
    const siteData = getSiteData(params.id)
    return {
        props: {
            siteData
        }
    }
}