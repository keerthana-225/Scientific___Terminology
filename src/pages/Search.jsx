import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Search.css'

function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('')
    setResults([])

    if (!searchTerm.trim()) {
      setError('Please enter a word to search')
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8000/api/search?term=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.results) {
        setResults(response.data.results)
      } else {
        setError('No results found')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Scientific Terminology Search</h1>
        <div className="user-info">
          <span>Welcome, {username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="search-form-wrapper">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter a word to search..."
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-btn">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {results.length > 0 && (
        <div className="results-container">
          <h2>Results for "{searchTerm}"</h2>
          <div className="results-list">
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <h3>{result.term}</h3>
                <p><strong>Definition:</strong> {result.definition}</p>
                {result.category && <p><strong>Category:</strong> {result.category}</p>}
                {result.examples && <p><strong>Examples:</strong> {result.examples}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
