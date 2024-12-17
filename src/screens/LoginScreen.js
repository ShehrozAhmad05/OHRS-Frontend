import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { set } from 'mongoose';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login() {
        if (!email || !password) {
            alert('Please fill all the fields');
        }
        else {
            const user = {
                email,
                password
            }
            try {
                setLoading(true);
                const result = await axios.post('http://localhost:5000/api/users/login', user);
                setLoading(false);
                localStorage.setItem('currentUser', JSON.stringify(result.data));
                window.location.href = '/';

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-md-5">
                    {error && (<Error message="Invalid Credentials" />)}
                    <div className="card p-4 bs">
                        <h1 className="text-center mb-4">Login</h1>
                        <input type="email" className="form-control mb-3" placeholder="Email"
                            value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" className="form-control mb-3" placeholder="Password"
                            value={password} onChange={(e) => { setPassword(e.target.value) }} />

                        <button className="btn btn-primary mt-3" onClick={login}>LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen