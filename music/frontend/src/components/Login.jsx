/* eslint-disable react/no-unescaped-entities */
import './LoginSignup.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>
      <div className="auth-container">
      <div className="auth-form">
        <h2>Welcome Back</h2>
        <p>Please sign-in to continue!</p>
        <div className="input-container">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <a href="#" className="forgot-password">Forget your password?</a>
        <Link to="/product"><button className="auth-btn">Signin</button></Link>
        <p className="signup-link">Don't have an account? <a href="/signup">Signup</a></p>
      </div>
    </div>
    </>
  )
}

export default Login
