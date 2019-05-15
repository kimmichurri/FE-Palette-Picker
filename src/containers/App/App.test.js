import { App, mapStateToProps, mapDispatchToProps } from './App';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('../../thunks/fetchProjects')
jest.mock('../../thunks/fetchPalettes')

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
    const mockCurrentColors = [
      {"color": "#f82e41", "locked": true}, 
      {"color": "#2261cd", "locked": true}, 
      {"color": "#271de3", "locked": true}, 
      {"color": "#1563ec", "locked": true}, 
      {"color": "#9e0246", "locked": true}
    ]
    let mockFetchProjects
    let mockStoreColors
    let mockFetchPalettes
    
    beforeEach(() => {
      mockFetchProjects = jest.fn().mockImplementation(() => Promise.resolve({mockProjects}))
      mockStoreColors = jest.fn().mockImplementation(() => Promise.resolve({mockCurrentColors}))
      mockFetchPalettes = jest.fn()
      wrapper = shallow(
        <App 
          error={mockError}
          projects={mockProjects}
          fetchProjects={mockFetchProjects}
          currentColors={mockCurrentColors}
          storeColors={mockStoreColors}
          fetchPalettes={mockFetchPalettes}
        />
      )
    })

    it('should match the snapshot with all data passed in', () => {
      expect(wrapper.debug()).toMatchSnapshot()
    })

    it('should invoke fetchProjects on componentDidMount', () => {
      wrapper.instance().componentDidMount()
      
      expect(mockFetchProjects).toHaveBeenCalled()

    })

    it('should invoke generateRandomColor on componentDidMount', () => {
      const spy = jest.spyOn(wrapper.instance(), 'generateRandomColor')
      
      wrapper.instance().componentDidMount()

      expect(spy).toHaveBeenCalled()
    })

    it.skip('should call props function storeColors with updatedColors array', () => {
      const mockUpdatedColors = [
        {"color": "#f82e41", "locked": true}, 
        {"color": "#2261cd", "locked": true}, 
        {"color": "#271de3", "locked": true}, 
        {"color": "#1563ec", "locked": true}, 
        {"color": "#9e0246", "locked": true}
      ]

      wrapper.instance().updateColors()

      expect(wrapper.instance().props.storeColors).toHaveBeenCalledWith(mockUpdatedColors)
    })
  });

  describe('mapStateToProps', () => {
    it('should return an object with an error string, projects array and currentColors array', () => {
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
        currentColors: [
          {"color": "#f82e41", "locked": true}, 
          {"color": "#2261cd", "locked": true}
        ],
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
        error: "",
        currentColors: [
          {"color": "#f82e41", "locked": true}, 
          {"color": "#2261cd", "locked": true}
        ]
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

    it('should dispatch storeColors with an array of colors', () => {
      const mockColors = [
        {"color": "#f82e41", "locked": true}, 
        {"color": "#2261cd", "locked": true}
      ]
      const mockDispatch = jest.fn()
      const storeColors = jest.fn()
      const actionToDispatch = storeColors(mockColors)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.storeColors(mockColors)

      expect(mockDispatch).toHaveBeenCalled(actionToDispatch)
    })

    it('should dispatch fetchPalettes', () => {
      const mockDispatch = jest.fn()
      const fetchPalettes = jest.fn()
      const actionToDispatch = fetchPalettes()
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.fetchPalettes()

      expect(mockDispatch).toHaveBeenCalled(actionToDispatch)
    })

  })
});