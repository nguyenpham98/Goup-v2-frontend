import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

const Login = ({handleLogin, loginStatus}) => {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="page register--page">
 <div className="page--left">
            <h1 id="text-1">Welcome To</h1>   
            <div id="page--logo"></div>
            </div>
        <div id='container'>
        <p className='is-size-3 has-text-weight-bold ml-4'>Login</p>
            <form className="box" onSubmit={e => e.preventDefault()}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder="e.g. alex@example.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
        
                {loginStatus && <article class="message is-small is-danger">
                    <div class="message-body">
                {loginStatus}
               </div>
               </article>}
                    <button className="button is-primary is-medium"
                    onClick={() => handleLogin(email,password)}
                    >Log In</button>
              
                <div className='container has-text-centered'>
                    <p>New user ?</p>
                    <button className='button is-info is-small' onClick={() => navigate('../register', {replace: true})}>Create new account</button>
                </div>

            </form>
            </div>
        </div>
    )
}

export default Login
