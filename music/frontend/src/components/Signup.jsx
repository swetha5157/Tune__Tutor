import './LoginSignup.css'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div className="auth-container">
    <div className="auth-form">
      <h2>Create Account</h2>
      <p>Please sign-up to continue!</p>
      <div className="input-container">
        <input type="text" placeholder="Full name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm password" />
      </div>
      <Link to="/login"><button className="auth-btn">Signup</button></Link>
      <p className="signin-link">Already have an account? <a href="/login">Signin</a></p>
    </div>
  </div>
  )
}

export default Signup
