import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './AuthPages.css'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

  const checkPasswordStrength = (password) => {
    if (!password) return ''
    
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    
    strength = Object.values(checks).filter(Boolean).length
    
    if (strength <= 2) return 'weak'
    if (strength === 3 || strength === 4) return 'medium'
    return 'strong'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
      setShowSuggestions(value.length > 0 && checkPasswordStrength(value) !== 'strong')
    }
  }

  const getPasswordRequirements = () => {
    const password = formData.password
    return [
      { text: 'At least 8 characters', met: password.length >= 8 },
      { text: 'Contains uppercase letter (A-Z)', met: /[A-Z]/.test(password) },
      { text: 'Contains lowercase letter (a-z)', met: /[a-z]/.test(password) },
      { text: 'Contains number (0-9)', met: /[0-9]/.test(password) },
      { text: 'Contains special character (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
    ]
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      if (response.status === 201) {
        alert('Registration successful! Please login.')
        navigate('/login')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {formData.password && (
              <div className={`password-strength ${passwordStrength}`}>
                <div className="strength-bar">
                  <div className={`strength-fill ${passwordStrength}`}></div>
                </div>
                <span className="strength-text">
                  Password Strength: <strong>{passwordStrength.toUpperCase()}</strong>
                </span>
              </div>
            )}
            {showSuggestions && (
              <div className="password-suggestions">
                <p><strong>Make your password stronger:</strong></p>
                <ul>
                  {getPasswordRequirements().map((req, idx) => (
                    <li key={idx} className={req.met ? 'met' : 'unmet'}>
                      <span className={req.met ? '✓' : '✗'}>{req.met ? '✓' : '✗'}</span> {req.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  )
}

export default Register
