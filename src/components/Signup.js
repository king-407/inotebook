import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Signup = () => {
    const host = "http://localhost:5000";
    const [credentials, updateCred] = useState({ name: "", email: "", password: "" });
    let history = useHistory();
    const onChange = (e) => {
        updateCred({ ...credentials, [e.target.name]: e.target.value })
    }

    const handle = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',


            },

            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.token);
            history.push("/");
        }
        else {
            alert(`${json.error}`)
        }
    }
    return (
        <>
            <form onSubmit={handle}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="email" value={credentials.name} name="name" onChange={onChange} aria-describedby="namelHelp" />
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default Signup