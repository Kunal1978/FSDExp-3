import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {
    name: 'John Doe',
    title: 'Full Stack Developer & UI/UX Designer',
    bio: "I create beautiful, functional, and user-centered digital experiences that bring ideas to life.",
    about: "I'm a passionate developer with over 5 years of experience creating digital solutions. I love turning complex problems into simple, beautiful designs.",
    interests: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities.",
    quickFacts: [
      '🎓 Computer Science Graduate',
      '💼 5+ Years Experience',
      '🌍 Remote Work Enthusiast',
      '🚀 Always Learning'
    ]
  },
  skills: [
    'React', 'JavaScript', 'Node.js', 'Python',
    'Tailwind CSS', 'TypeScript', 'MongoDB', 'AWS',
    'Git', 'Docker', 'Figma', 'Adobe XD'
  ],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team features.',
      tech: ['React', 'Firebase', 'Tailwind']
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with location-based forecasts and interactive maps.',
      tech: ['JavaScript', 'OpenWeather API', 'Chart.js']
    }
  ],
  socialLinks: {
    linkedin: '#',
    github: '#',
    twitter: '#'
  }
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload)
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill !== action.payload)
    },
    addProject: (state, action) => {
      const newProject = {
        ...action.payload,
        id: Math.max(...state.projects.map(p => p.id), 0) + 1
      }
      state.projects.push(newProject)
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload }
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload)
    },
    updateSocialLinks: (state, action) => {
      state.socialLinks = { ...state.socialLinks, ...action.payload }
    }
  }
})

export const {
  updateProfile,
  addSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  updateSocialLinks
} = portfolioSlice.actions

export default portfolioSlice.reducer

