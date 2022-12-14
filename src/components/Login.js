
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/")
      props.showAlert("Logged in Successfully", "success")

    }
    else {
      props.showAlert("invalid Details", "danger")
    }
  }


  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='mt-3'>
      <h2 className='my-4'>Log in to continue to iNotify</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group col-md-4 my-3">
          <label htmlFor="email"><strong>Email Address</strong></label>
          <input type="email" className="form-control my-1" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="password"><strong>Password</strong></label>
          <input type="password" className="form-control my-1" value={credentials.password} onChange={onChange} id="password" name='password' placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary my-3">Submit</button>
      </form>
    </div>
  )
}

export default Login
