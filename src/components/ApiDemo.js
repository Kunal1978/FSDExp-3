import { useState, useEffect } from 'react'
import { apiService } from '../services/api'

export const ApiDemo = () => {
  const [githubProfile, setGithubProfile] = useState(null)
  const [loading, setLoading] = useState({
    github: false
  })
  const [error, setError] = useState(null)

  // Fetch GitHub repositories for Kunal-Ailsinghani
  const fetchGitHubRepos = async () => {
    setLoading(prev => ({ ...prev, github: true }))
    setError(null)
    const result = await apiService.getGitHubProfile('Kunal-Ailsinghani')
    setLoading(prev => ({ ...prev, github: false }))
    if (result.success) {
      setGithubProfile(result.data)
    } else {
      setError(result.error)
    }
  }

  // Load initial data
  useEffect(() => {
    fetchGitHubRepos() // Load GitHub repos on mount
  }, [])

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            API Integration Demo
          </h2>
          <p className="text-center text-gray-600 mb-12">
            This section demonstrates API integration using GitHub Repositories API
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              Error: {error}
            </div>
          )}

          {/* GitHub Repositories Section - MAIN FEATURE */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl p-6 mb-8 text-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-semibold mb-2">GitHub Repositories API</h3>
                <p className="text-gray-300 text-sm">Fetching repos from <a href="https://github.com/Kunal-Ailsinghani" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@Kunal-Ailsinghani</a></p>
              </div>
              <button
                onClick={fetchGitHubRepos}
                disabled={loading.github}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading.github ? 'Loading...' : 'Refresh Repos'}
              </button>
            </div>
            {loading.github ? (
              <div className="text-center py-8">
                <p className="text-gray-300">Loading GitHub repositories...</p>
              </div>
            ) : githubProfile ? (
              <div>
                {/* User Profile */}
                <div className="bg-gray-700 rounded-lg p-4 mb-4 flex items-center space-x-4">
                  <img
                    src={githubProfile.user.avatar_url}
                    alt={githubProfile.user.login}
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{githubProfile.user.name || githubProfile.user.login}</h4>
                    <p className="text-gray-300 text-sm">@{githubProfile.user.login}</p>
                    <p className="text-gray-400 text-sm mt-1">{githubProfile.user.bio}</p>
                    <div className="flex space-x-4 mt-2 text-sm">
                      <span className="text-gray-300">
                        <strong className="text-white">{githubProfile.user.public_repos}</strong> Repositories
                      </span>
                      <span className="text-gray-300">
                        <strong className="text-white">{githubProfile.user.followers}</strong> Followers
                      </span>
                      <span className="text-gray-300">
                        <strong className="text-white">{githubProfile.user.following}</strong> Following
                      </span>
                    </div>
                  </div>
                </div>

                {/* Repositories List */}
                {githubProfile.repos && githubProfile.repos.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {githubProfile.repos.map((repo) => (
                      <div key={repo.id} className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500 hover:bg-gray-600 transition">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg text-white">
                            <a 
                              href={repo.html_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-blue-400 transition"
                            >
                              {repo.name}
                            </a>
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            repo.visibility === 'public' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-gray-200'
                          }`}>
                            {repo.visibility}
                          </span>
                        </div>
                        {repo.description && (
                          <p className="text-gray-300 text-sm mb-3">{repo.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                          {repo.language && (
                            <span className="bg-gray-800 px-2 py-1 rounded">
                              {repo.language}
                            </span>
                          )}
                          <span className="bg-gray-800 px-2 py-1 rounded">
                            ⭐ {repo.stargazers_count}
                          </span>
                          <span className="bg-gray-800 px-2 py-1 rounded">
                            🍴 {repo.forks_count}
                          </span>
                          <span className="bg-gray-800 px-2 py-1 rounded">
                            Updated: {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300">No repositories found</p>
                )}
              </div>
            ) : (
              <p className="text-gray-300">Click the button to fetch GitHub repositories</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

