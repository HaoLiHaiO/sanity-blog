// @ts-nocheck
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import sanityClient from '../client'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient)

const urlFor = (source: SanityImageSource)=> {
    return builder.image(source)
}

const OnePost = () => {
    const [postData, setPostData] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        sanityClient
        .fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                "name": author->name,
                "authorImage": author->image
            }`,
            { slug }
        )
        .then((data) => setPostData(data[0]))
        .catch(console.error)
    }, [slug])

    if (!postData) return <div>Loading...</div>

    return (
        <div>
            <div>
                <h2>{postData.title}</h2>
                <div>
                    <img src={urlFor(postData.authorImage).width(100).url()} 
                    alt="Author" 
                    />
                    <h4>{postData.name}</h4>
                </div>
            </div>
            <img src={urlFor(postData.mainImage).width(200).url()} 
            alt="" 
            />
            <div>
                <BlockContent 
                blocks={postData.body} 
                projectId={sanityClient.client.config().projectId} 
                dataset={sanityClient.client.config().dataset} />
            </div>
        </div>
    )
}

export default OnePost