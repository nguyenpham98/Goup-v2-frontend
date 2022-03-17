import React, { useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
const Login = ({handleLogin}) => {
    let navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div>
            <p className='has-text-centered has-text-weight-bold has-text-success is-size-1 mt-6'>Welcome to Goup</p>
            <p className='has-text-centered is-size-4'>social platform for everyone</p>
            <form id="box" className="box" onSubmit={e => e.preventDefault()}>
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
                <div className='box has-text-centered'>
                    <button className="button is-primary is-medium"
                    onClick={() => handleLogin(email,password)}
                    >Log In</button>
                </div>
                <div className='container has-text-centered'>
                    <button className='button is-info is-small' onClick={() => navigate('../register', {replace: true})}>Create new account</button>
                </div>

            </form>
        </div>
    )
}

export default Login
