import { all } from 'q'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import sanityClient from '../client'

const AllPosts = () => {
    const [allPostsData, setAllPosts] = useState(null) 
    
    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`
        )
        .then((data) => setAllPosts(data))
        .catch(console.error)
    }, [])

    return (
        <div>
            <h2>Blog Posts</h2>
            <h3>Welcome to my Sanity io blog</h3>
            <div>
                {allPostsData &&
                // @ts-ignore
                allPostsData.map((post, index) => 
                <Link to={"/" + post.slug.current} key={post.slug.current}>
                    <span key={index}>
                        <img src={post.mainImage.asset.url} alt="" />
                    </span>
                    <h2>{post.title}</h2>
                </Link>
                )
                }
            </div>
        </div>
    )
}

export default AllPosts