import './App.css';
import 'bulma/css/bulma.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Home from './Home';
import Explore from './Explore';
import OtherProfile from './OtherProfile';
import UserProfile from './UserProfile';
import { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  const [isActive, setIsActive] = useState(false)
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [postBody, setPostBody] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [messageStatus, setMessageStatus] = useState("")
  const handleLogin = (email, password) => {
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        (data.error) && setMessageStatus(data.error)
        setUserId(data.userId)
      })
      .catch(err => console.log("Error: ", err)
    )
  }

  const handleRegister = (username, email, password) => {
    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        (data.error) && setMessageStatus(data.error)
        console.log(data)
        setUserId(data.userId)
      })
      .catch(err => console.log("Error: ", err))
  }

  const handleLogout = () => {
    fetch('http://localhost:5000/auth/logout', {
      credentials: 'include',

    })
      .then(response => response.json())
      .then(data => setUserId(""))
      .catch(err => console.log("Error: ", err))

  }

  const handleAddPost = () => {
    fetch('http://localhost:5000/add-post', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: postBody
      })
    })
      .then(response => response.json())
      .then(data => {
        setPostBody("")
        setOpenModal(false)
        console.log(data)
      })
      .catch(err => console.log("Error: ", err))
  
  }
  

  useEffect(() => {

    fetch('http://localhost:5000/auth/me', {
      credentials: 'include',

    })
      .then(response => response.json())
      .then(data => {
        setUserId(data.userId)
        setIsLoading(false)
      })
      .catch(err => {
        console.log("Error: ", err)
        setIsLoading(false)
      })
  }, [])
  
  return (
    <div>
      {isLoading ? 
      
      <p id='loading__text' className='has-text-centered has-text-link has-text-weight-bold is-size-1'>Loading...</p>
      :
      <BrowserRouter>
        <nav className="navbar mt-4" role="navigation" aria-label="main navigation">
       
        <div className="navbar-brand">
          <Link to='/'>
          <div id='logo' className="navbar-item ml-6"></div>
                </Link>
            {userId && <>
            <Link to='/'
              onClick={() => {
                setIsActive(!isActive);
              }} 
              role="button" 
              className={`navbar-burger burger ${isActive ? "is-active" : ""}`} 
              aria-label="menu" 
              aria-expanded="false" 
              data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
            </>
            }
          </div>
          
          <div id="navbarBasicExample" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
            <div className="navbar-start">
              {userId && 
              <>
                  <Link to='/explore' className="navbar-item is-size-5 has-text-primary-dark has-text-weight-bold ml-6">
                  Explore
                </Link>
                <button className="button is-info is-rounded ml-6" onClick={() => setOpenModal(true)}>
                  <p className='is-size-5'>Make a post</p>
                </button>
              </>
              }
              
            </div>
            
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {userId &&
                    <>
                      
                      <Link to='/profile' className="button--color button mr-3">
                        <p className='is-white is-size-5'>Profile</p>
                      </Link>
                      <button className="button is-white mr-6" onClick={() => handleLogout()}>
                        <p className='is-size-5'>Log out</p>
                      </button>
                    </>

                  }
                  
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className={`modal ${openModal ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={() => setOpenModal(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-weight-bold has-text-info">Make a post</p>
                <button className='button is-success is-small' onClick={() => handleAddPost(postBody)}>✓</button>
            </header>
            <section className="modal-card-body">
              <form>
                <textarea className='textarea is-info mb-3' rows="7" placeholder={'What\'s on your thought?'} 
                  value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                
              </form>
            </section>
          </div>
        </div>

        <Routes>
          <Route index path="/" element={
             <PrivateRoute auth={userId}>
              <Home/>
            </PrivateRoute> 
          } />
          <Route path="explore" element={
            <PrivateRoute auth={userId}>
                <Explore />
            </PrivateRoute>
          } />  
          <Route path="profile">
            <Route index element={
              <PrivateRoute auth={userId}>
                <UserProfile />
              </PrivateRoute>
            } />
            <Route path=":userId" element={
              <PrivateRoute auth={userId}>
                <OtherProfile />
              </PrivateRoute>
            } />
          </Route>
          
          <Route path="login" element={
            <PublicRoute notLoggedIn={!userId}>
              <Login handleLogin={handleLogin} loginStatus={messageStatus}/>
            </PublicRoute>
          } />
          <Route path="register" element={
            <PublicRoute notLoggedIn={!userId}>
              <Register handleRegister={handleRegister} registerStatus={messageStatus}/>
            </PublicRoute>
          } />
        </Routes>
      </BrowserRouter>
      }
      
    </div>
  );
}

export default App;
