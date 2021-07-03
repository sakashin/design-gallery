import Image from 'next/image'

export default function ImgOrImage({ src, width, height, alt }) {
    const enviroment = process.env.NODE_ENV;
    if( enviroment == "development"){
        return <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    } else {
        return <Image src={src} alt={alt} width={width} height={height} loading="lazy" />
    }
}
