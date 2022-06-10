import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ExplorePost = ({post}) => {
    const [isFollowing, setIsFollowing] = useState(post.is_following)
    const [Like, setLike] = useState(false)
    let isAuthorCurrentUser = post.is_author_current_user

    function handleLike() {
        setLike(!Like)
    }
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
                        <Link to={`/profile/${post.user.id}`}>
                            <p className="is-size-4 has-text-black">@{post.user.username || 'Gouper'}</p>

                        </Link>

                    </div>
                    {!isAuthorCurrentUser && 
                        <>
                            {isFollowing ?
                                <div className='media-right'>
                                    <button className='button is-outlined' onClick={() => handleUnfollow(post.user.id)}>Followed ✔</button>
                                </div>
                                :
                                <div className='media-right'>
                                    <button className='button is-outlined' onClick={() => handleFollow(post.user.id)}>Follow</button>
                                </div>
                            }
                        </>
                    }
                    
                    

                </div>

                <div className="content pb-1">
                    <p className='is-size-6 ml-3'>{post.content}</p>
                    <p className='is-italic is-size-7'>Posted on {post.createDate}</p>
                </div>
                
            </div>
            <span className="icon pt-1mt-1 mb-4" style={{marginLeft: 90+ '%', color: Like ? "#eb1e4b" : "gray"}}>
                 <i className="fab fa-2x fa-gratipay" onClick={handleLike}></i>
                </span>
        </div> 
    )
}

export default ExplorePost
