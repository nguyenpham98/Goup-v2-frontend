import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import UserProfilePost from './UserProfilePost'
import './userprofile.css'

const OtherProfile = () => {
    let {userId} = useParams()
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [posts, setPosts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [openModal, setOpenModal] = useState(false)

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

    useEffect(() => {
        fetch(`http://localhost:5000/user-profile/${userId}`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setUsername(data.username)
                setBio(data.bio)
                setPosts(data.posts)
                setIsFollowing(data.is_following)
                console.log(data)
            })
            .catch(err => console.log("Error fetching user profile", err))
    }, [userId])

    return (
        <div className='mt-6'>

            <div className={`modal ${openModal ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setOpenModal(false)}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title has-text-weight-bold has-text-info">Edit my profile</p>
                        <button className='button is-success is-small'>✓</button>
                    </header>
                    <section className="modal-card-body">
                        <form>
                            <p className='is-size-6 has-text-weight-semibold mb-3'>My username</p>
                            <input className='input is-info mb-3' type="text" placeholder={username || 'Unnamed'} />
                            <p className='is-size-6 has-text-weight-semibold mb-3'>My bio</p>
                            <input className='input is-info mb-3' type="text" placeholder={bio || 'No bio yet'} />
                        </form>
                    </section>
                </div>
            </div>

            <div id='user__profile__card' className="card mb-6">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <span className="tag is-rounded is-info is-large">
                                <p className='is-size-4 has-text-weight-bold is-capitalized'>{(username && username.charAt(0)) || 'G'}</p>
                            </span>
                        </div>
                        <div className="media-content is-inline-flex">
                            <p className="is-size-4 mr-3">@{username || 'Gouper'}</p>
                            {isFollowing ?
                                <button className='button is-outlined' onClick={() => handleUnfollow(userId)}>Followed ✔</button>
                                :
                                <button className='button is-outlined' onClick={() => handleFollow(userId)}>Follow</button>
                            }
                        </div>
                        <div className='media-right'>
                            <button className='button is-medium is-white' onClick={() => setOpenModal(true)}>
                                <span className="icon has-text-info" >
                                    <i className="fas fa-edit"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <p className='is-size-6'>{bio || 'I love football'}</p>
                    </div>
                </div>
            </div>

            <div id='user__profile__posts' className='container'>
                {posts && posts.map((post, index) =>
                    <UserProfilePost post={post} index={index} key={post.postId} />
                )}



            </div>
        </div>
    )
}

export default OtherProfile
