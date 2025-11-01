import { useSelector, useDispatch } from 'react-redux'
import {
  updateProfile,
  addSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  updateSocialLinks
} from '../store/slices/portfolioSlice'

export const usePortfolio = () => {
  const dispatch = useDispatch()
  const portfolio = useSelector(state => state.portfolio)

  return {
    portfolio,
    updateProfile: (data) => dispatch(updateProfile(data)),
    addSkill: (skill) => dispatch(addSkill(skill)),
    removeSkill: (skill) => dispatch(removeSkill(skill)),
    addProject: (project) => dispatch(addProject(project)),
    updateProject: (project) => dispatch(updateProject(project)),
    removeProject: (projectId) => dispatch(removeProject(projectId)),
    updateSocialLinks: (links) => dispatch(updateSocialLinks(links))
  }
}

