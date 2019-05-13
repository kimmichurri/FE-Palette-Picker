import { App, mapStateToProps, mapDispatchToProps } from './App';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('../../thunks/fetchProjects')

describe('App Container', () => {
  describe('App', () => {
    let wrapper
    const mockError = "Something went wrong"
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
    const mockCurrentColors = ['#F1C231' , '#E69138' , '#44818E' , '#B46005' , '#F9CB9C']
    let mockFetchProjects
    let mockStoreColors
    
    beforeEach(() => {
      mockFetchProjects = jest.fn().mockImplementation(() => Promise.resolve({mockProjects}))
      mockStoreColors = jest.fn().mockImplementation(() => Promise.resolve({mockCurrentColors}))
      wrapper = shallow(
        <App 
          error={mockError}
          projects={mockProjects}
          fetchProjects={mockFetchProjects}
          currentColors={mockCurrentColors}
          storeColors={mockStoreColors}
        />
      )
    })

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper.debug()).toMatchSnapshot()
    })

    it('should invoke fetchProjects on componentDidMount', () => {
      const mockUrl = 'https://palette-picker-mfjk.herokuapp.com/api/v1/projects'
      wrapper.instance().componentDidMount()
      expect(mockFetchProjects).toHaveBeenCalledWith(mockUrl)
    })
  });

  describe('mapStateToProps', () => {
    it('should return an object with an error string and projects array', () => {
      const mockState = {
        projects: [
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
        ],
        error: "",
        fakeState: "Not real state to return"
      }

      const expected = {
        projects: [
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
        ],
        error: ""
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch fetchProjects with url', () => {
      const mockDispatch = jest.fn()
      const fetchProjects = jest.fn()
      const actionToDispatch = fetchProjects('www.projects.com')
      const mappedProps = mapDispatchToProps(mockDispatch)
      
      mappedProps.fetchProjects('www.projects.com')

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})