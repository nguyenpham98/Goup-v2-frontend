import React, { useState } from 'react'

const UserProfilePost = ({post, index}) => {
    const [openModal, setOpenModal] = useState(false)
    const [content, setContent] = useState(post.body)
    let color = index % 2 === 0 ? 'is-info' : 'is-success'
    
    const handleEditPost = (id, content) => {
        fetch('http://localhost:5000/user/edit-post', {
            method: "POST",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: {
                id: id,
                content: content
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <div className='mb-6'>
            <div className={`modal ${openModal ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setOpenModal(false)}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title has-text-weight-bold has-text-info">Edit my post</p>
                        <button className='button is-success is-small' onClick={() => handleEditPost(post.id, content)}>✓</button>
                    </header>
                    <section className="modal-card-body">
                        <form>
                            <p className='is-size-6 has-text-weight-semibold mb-3'>My post</p>
                            <input className='input is-info mb-3'
                             type="text" 
                             placeholder="hello world" 
                             value={content} 
                             onChange={(e) => setContent(e.target.value)}
                             />
                        </form>
                    </section>
                </div>
            </div>

            <article className={`message ${color}`} >
                <div className="message-body">
                    <div className='is-inline-flex'>
                        <p className='is-size-6'>{post.content}</p><br />{ }
                        <button className={`button is-small is-info is-light ${color}`} onClick={() => setOpenModal(true)}>
                            <span className="icon">
                                <i className="fas fa-edit"></i>
                            </span>
                        </button>
                    </div>
                    
                    <p className='has-text-black is-italic'>Posted on {post.createDate}</p>
                </div>
            </article>
        </div>
    )
}

export default UserProfilePost
