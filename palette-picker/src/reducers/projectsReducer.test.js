import { projectsReducer } from './projectsReducer';
import * as actions from '../actions';

describe('projectsReducer', () => {
  let mockState = []

  it('should return default state', () => {
    const action = {}

    const result = projectsReducer(mockState, action)

    expect(result).toEqual(mockState)
  })

  it('should return an array of projects when type is STORE_PROJECTS', () => {
    const mockProjects = [
      { project_id: 1,
        project_name: "Travel App",
        created_at: "2019-05-10T17:45:09.612Z",
        updated_at: "2019-05-10T17:45:09.612Z"
      },
      { project_id: 2,
        project_name: "Fitness App",
        created_at: "2019-05-10T17:45:09.634Z",
        updated_at: "2019-05-10T17:45:09.634Z"
      }
    ]
    const action = actions.storeProjects(mockProjects)
    
    const result = projectsReducer(mockState, action)
    
    expect(result).toEqual(mockProjects)
  })

  it('should return an updated array of projects when type is ADD_PROJECT', () => {
    mockState = [
      { project_id: 1,
        project_name: "Travel App",
      },
      { project_id: 2,
        project_name: "Fitness App",
      }
    ]
    const mockNewProject = { 
      project_id: 3,
      project_name: "Bird Watcher App",
    }
    const expected = [
      { project_id: 1,
        project_name: "Travel App",
      },
      { project_id: 2,
        project_name: "Fitness App",
      },
      { project_id: 3,
        project_name: "Bird Watcher App",
      }
    ]

    const action = actions.addProject(mockNewProject)

    const result = projectsReducer(mockState, action)

    expect(result).toEqual(expected)
  })
})