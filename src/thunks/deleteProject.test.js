import { deleteProject } from './deleteProject';
import { fetchOptionsCreator } from '../utils/fetchOptionsCreator';
import { hasError } from '../actions';

describe('deleteProject', () => {
  let mockUrl
  let mockProject
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'www.projects.com'
    mockProject = { 
      project_id: 1,
      project_name: "Travel App",
      created_at: "2019-05-10T17:45:09.612Z",
      updated_at: "2019-05-10T17:45:09.612Z"
    }
    mockDispatch = jest.fn()
  })

  it('should dispatch hasError if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'Something went wrong'
    }));

    const thunk = await deleteProject(mockProject.project_id)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
  })
})