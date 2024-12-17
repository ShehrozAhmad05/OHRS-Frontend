import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import { set } from 'mongoose';

function RegisterScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCpassword, setShowCpassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function register() {
        if (!name || !email || !password || !cpassword) {
            alert('Please fill all the fields');
        } else if (password !== cpassword) {
            alert('Password and Confirm Password do not match');
        } else {
            const user = {
                name,
                email,
                password,
                cpassword
            }

            try {
                setLoading(true);
                const result = await axios.post('http://localhost:5000/api/users/register', user);
                setLoading(false);
                setSuccess(true);

                setName('');
                setEmail('');
                setPassword('');
                setCpassword('');

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
            {error && (<Error />)}
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="col-md-5">
                    {success && (<Success message="User Registered Successfully" />)}
                    <div className="card p-4 bs">
                        <h1 className="text-center mb-4">Register</h1>

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <div className="input-group mb-3">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <div className="input-group mb-3">
                            <input
                                type={showCpassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Confirm Password"
                                value={cpassword}
                                onChange={(e) => { setCpassword(e.target.value) }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setShowCpassword(!showCpassword)}
                            >
                                {showCpassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        <button className="btn btn-primary mt-3" onClick={register}>REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterScreen