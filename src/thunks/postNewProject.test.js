import { postNewProject } from './postNewProject';
import { hasError, addProject } from '../actions';

describe('postNewProject', () => {
  let mockProjectName
  let mockUrl
  let mockDispatch
  let mockProjectId
  let mockNewProject

  beforeEach(() => {
    mockProjectName = "Travel App"
    mockUrl = "www.yoshi.com"
    mockDispatch = jest.fn()
    mockProjectId = 1
    mockNewProject = { 
      project_id: 1,
      project_name: "Travel App"
    }
  })

  it('should dispatch addProject if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: true,
      json: () => Promise.resolve({ project_id: mockProjectId })
    }))

    const thunk = await postNewProject(mockUrl, mockProjectName)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(addProject(mockNewProject))
  })

  it('should dispatch hasError if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: false,
      statusText: 'Something went wrong'
    }))

    const thunk = await postNewProject(mockUrl, mockProjectName)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
  })
})