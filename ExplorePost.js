import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ExplorePost = ({post}) => {
    const [isFollowing, setIsFollowing] = useState(post.is_following)
    let isAuthorCurrentUser = post.is_author_current_user

    const handleFollow = (userId) => {
        fetch(`http://localhost:5000/follow/${userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setIsFollowing(true)
                console.log(data)
            })
            .catch(err => console.log("Error: ", err))
    }

    const handleUnfollow = (userId) => {
        fetch(`http://localhost:5000/unfollow/${userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setIsFollowing(false)
                console.log(data)
            })
            .catch(err => console.log("Error: ", err))
    }

    return (
        <div id='explore__card' className="card mb-6" >
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <Link to={`/profile/${post.author.id}`}>
                            <p className="is-size-4 has-text-black">@{post.author.username || 'Gouper'}</p>

                        </Link>

                    </div>
                    {!isAuthorCurrentUser && 
                        <>
                            {isFollowing ?
                                <div className='media-right'>
                                    <button className='button is-outlined' onClick={() => handleUnfollow(post.author.id)}>Followed ✔</button>
                                </div>
                                :
                                <div className='media-right'>
                                    <button className='button is-outlined' onClick={() => handleFollow(post.author.id)}>Follow</button>
                                </div>
                            }
                        </>
                    }
                    
                    

                </div>

                <div className="content">
                    <p className='is-size-6 ml-3'>{post.body}</p>
                    <p className='is-italic'>Posted on {post.timestamp}</p>
                </div>
            </div>
        </div> 
    )
}

export default ExplorePost
