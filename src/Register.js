import React, { useState } from 'react'
import './register.css'

const Register = ({handleRegister, registerStatus}) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordStatus, setPasswordStatus] = useState("")
    const isValidPassword = (e) => {
        var pw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}$/.test(e.target.value)
        if(pw || e.target.value === ""){
        setPasswordStatus("")
        setPassword(e.target.value)
        }
    
        else {
            setPassword("")
            setPasswordStatus("Password needs to be 8-25 length, at least one uppercase, one lowercase, one number")
        }
        
    }
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
                        <input className="input" type="password" placeholder="********" onChange={isValidPassword} />
                    </div>
                </div>
                {username && registerStatus && <article className="message is-small is-danger">
                    <div className="message-body">
                {registerStatus}
                </div>
                </article>}
                {passwordStatus && <article className="message is-small is-danger">
                    <div className="message-body">
                {passwordStatus}
               </div>
               </article>}
                <button className="button has-text-weight-bold" onClick={() => handleRegister(username, email, password)}>Register</button>
            </form>
        </div>
        </div>
    )
}

export default Register
