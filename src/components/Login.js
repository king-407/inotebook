import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
const Login = () => {
  const onChange = (e) => {
    updateCred({ ...credentials, [e.target.name]: e.target.value })
  }
  const [credentials, updateCred] = useState({ email: "", password: "" });
  let history = useHistory();
  const host = "http://localhost:5000";
  const handle = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',


      },

      body: JSON.stringify({ email: credentials.email, password: credentials.password })
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
    <div>
      <form onSubmit={handle}>
        <div class="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" />

        </div>
        <div class="mb-3">
          <label for="Password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login;