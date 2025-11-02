// API Service for handling HTTP requests

const API_BASE_URL = 'https://jsonplaceholder.typicode.com' // Using JSONPlaceholder as a demo API

// Generic fetch function
const fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API Error:', error)
    return { success: false, error: error.message }
  }
}

// Generic fetch for JSONPlaceholder API
const fetchJSONPlaceholder = async (endpoint, options = {}) => {
  return fetchAPI(`${API_BASE_URL}${endpoint}`, options)
}

// API Functions
export const apiService = {
  // Get posts (demo data)
  getPosts: async (limit = 10) => {
    return fetchJSONPlaceholder(`/posts?_limit=${limit}`)
  },

  // Get a single post
  getPost: async (id) => {
    return fetchJSONPlaceholder(`/posts/${id}`)
  },

  // Get users (demo data)
  getUsers: async (limit = 5) => {
    return fetchJSONPlaceholder(`/users?_limit=${limit}`)
  },

  // Get a single user
  getUser: async (id) => {
    return fetchJSONPlaceholder(`/users/${id}`)
  },

  // Submit contact form (will be simulated since JSONPlaceholder doesn't support POST to contacts)
  submitContactForm: async (formData) => {
    // For demo purposes, we'll post to /posts endpoint
    // In a real app, this would be your own backend endpoint
    return fetchJSONPlaceholder('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: `Contact from ${formData.name}`,
        body: `Email: ${formData.email}\nMessage: ${formData.message}`,
        userId: 1,
      }),
    })
  },

  // Get random user from randomuser.me API (alternative demo)
  getRandomUser: async () => {
    try {
      const response = await fetch('https://randomuser.me/api/')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return { success: true, data: data.results[0] }
    } catch (error) {
      console.error('API Error:', error)
      return { success: false, error: error.message }
    }
  },

  // REST Countries API - Great for practical exams!
  // Get all countries
  getCountries: async () => {
    return fetchAPI('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,currencies')
  },

  // Get country by name
  getCountryByName: async (name) => {
    return fetchAPI(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
  },

  // Get random country
  getRandomCountry: async () => {
    const result = await fetchAPI('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,currencies,timezones,languages')
    if (result.success && result.data) {
      const randomIndex = Math.floor(Math.random() * result.data.length)
      return { success: true, data: result.data[randomIndex] }
    }
    return result
  },

  // Dog API - Fun and visual API
  getRandomDog: async () => {
    return fetchAPI('https://dog.ceo/api/breeds/image/random')
  },

  // Get list of dog breeds
  getDogBreeds: async () => {
    return fetchAPI('https://dog.ceo/api/breeds/list/all')
  },

  // Quotes API - Inspirational quotes
  getRandomQuote: async () => {
    return fetchAPI('https://api.quotable.io/random')
  },

  // GitHub API - Public repos (no auth needed for public endpoints)
  getGitHubUser: async (username) => {
    return fetchAPI(`https://api.github.com/users/${encodeURIComponent(username)}`)
  },

  // Get GitHub user repositories
  getGitHubRepos: async (username) => {
    return fetchAPI(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`)
  },

  // Get GitHub user profile with repos
  getGitHubProfile: async (username) => {
    const [userResult, reposResult] = await Promise.all([
      fetchAPI(`https://api.github.com/users/${encodeURIComponent(username)}`),
      fetchAPI(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10`)
    ])
    
    if (userResult.success && reposResult.success) {
      return { 
        success: true, 
        data: { 
          user: userResult.data, 
          repos: reposResult.data 
        } 
      }
    }
    return { success: false, error: userResult.error || reposResult.error }
  },

  // News API alternative - Using NewsAPI (requires key, but we'll show structure)
  // Note: For actual use, you'd need an API key from https://newsapi.org
  // For demo purposes, we'll use a free alternative
  getNews: async () => {
    // Using a free alternative news API
    return fetchAPI('https://newsapi.org/v2/top-headlines?country=us&apiKey=demo') // Replace with actual key
  },
}

export default apiService

