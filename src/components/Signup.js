import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/")
      props.showAlert("Account Created Successfully", "success")

    }
    else {
      props.showAlert("invalid Credentials", "danger")
    }


  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-4'>
      <h2>Create your free account to join iNotify</h2>

      <form onSubmit={handleSubmit} >
        <div className="form-group my-3 col-md-4">
          <label htmlFor="name">Name</label>
          <input type="name" className="form-control" id="name" name='name' onChange={onChange} />
        </div>

        <div className="form-group my-3 col-md-4">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="email" />

        </div>
        <div className="form-group my-3 col-md-4">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="form-group my-3 col-md-4">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
