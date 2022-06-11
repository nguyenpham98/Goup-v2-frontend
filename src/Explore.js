import React, { useEffect, useState } from 'react'
import './explore.css'
import ExplorePost from './ExplorePost'

const Explore = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/user/all-posts', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            
            console.log(data)
            setPosts(data.posts)
        })
        .catch(err => console.log("error fetching posts", err))
    }, [setPosts])
    
    return (
        <>
            <p id='explore__title' className='is-size-1 has-text-primary-dark has-text-weight-bold has-text-centered'>#EXPLORE</p>

            <div id='explore__container' className='container'>
                {posts && posts.map(post => 
                    <ExplorePost post={post} key={post.id} />
                )}
            </div>
        </>
    )
}

export default Explore
