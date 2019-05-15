import { fetchProjects } from './fetchProjects';
import { hasError, storeProjects } from '../actions';

describe('fetchProjects', () => {
  let mockUrl
  let mockDispatch
  let mockProjects

  beforeEach(() => {
    mockUrl = "www.yoshi.com"
    mockDispatch = jest.fn()
    mockProjects = [
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
  })

  it('should dispatch storeProjects if the response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: true,
      json: () => Promise.resolve(mockProjects)
    }))

    const thunk = await fetchProjects(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(storeProjects(mockProjects))
  })

  it('should dispatch hasError if the response is not okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ 
      ok: false,
      statusText: 'Something went wrong'
    }))

    const thunk = await fetchProjects(mockUrl)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasError('Something went wrong'))
  })
})