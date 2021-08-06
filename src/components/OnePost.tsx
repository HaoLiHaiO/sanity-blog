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
    return <h2>OnePost Page</h2>
}

export default OnePost