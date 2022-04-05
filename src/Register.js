import React, { useState } from 'react'
import './register.css'

const Register = ({handleRegister}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="page register--page">
            <div className="page--left">
            <h1>A place for</h1> <h1 id="text-1">everybody</h1>
            </div>
        <div id='container'>
        <p className='is-size-3 has-text-weight-bold ml-4'>Sign up</p>
            <p className='is-size-6 ml-4'>It's quick and easy.</p>
            <form className="box" onSubmit={(e) => e.preventDefault()}>

                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="username" placeholder="e.g. alex123" onChange={e => setUsername(e.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder="e.g. alex@example.com" onChange={e => setEmail(e.target.value)}/>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="********" onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>

                <button className="button has-text-weight-bold" onClick={() => handleRegister(username, email, password)}>Register</button>
            </form>
        </div>
        </div>
    )
}

export default Register
