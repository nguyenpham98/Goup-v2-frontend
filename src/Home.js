import React from 'react'
import "./Home.css"
const Home = ({postBody,setPostBody, handleAddPost}) => {
    return (
        <div className="main">
        <div className="page">
          <div className="page--left">
              <h1>A place for</h1> <h1 id="text-1">everybody</h1>
          </div>
          <div className="page--right">
              <div className="homepage--info">
                  <p id="title-1">Welcome back to GOUP</p>
                  <p>GOUP is where you can make friend and share your memories with each other</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi in nulla posuere sollicitudin aliquam ultrices. Nec feugiat in fermentum posuere. Sapien pellentesque habitant morbi tristique senectus et netus et. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. </p>
              </div>
              <span className="homepage--button">Begin Your Journey</span>
          </div>
        </div>
        <div className="textcontainer">
            <textarea className="home--textarea" rows="4" placeholder={'What\'s on your thought?'} 
            value={postBody} onChange={(e) => setPostBody(e.target.value)} />
             <button id="submitbutton" className='button mb-3' onClick={() => handleAddPost(postBody)}>Post</button>
        </div>
        </div>
    )
}

export default Home
