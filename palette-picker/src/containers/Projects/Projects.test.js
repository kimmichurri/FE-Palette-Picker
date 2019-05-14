import { Projects, mapStateToProps, mapDispatchToProps } from './Projects';
import React from 'react';
import { shallow } from 'enzyme';

describe('Projects Container', () => {
  describe('Projects', () => {
    it('should match the snapshot', () => {

    })

    it('should have default state', () => {

    })

    it('should set state with a project name', () => {

    })

    it('should call fetchOptionsCreator with a method and body', () => {

    })

  })

  describe('mapStateToProps', () => {
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
      ]
    }

    const mappedProps = mapStateToProps(mockState)
    expect(mappedProps).toEqual(expected)
  })

  describe('mapDispatchToProps', () => {
    const mockUrl = 'www.projects.com'
    const mockBody = { project_name: "Harold's Project" }
    const mockDispatch = jest.fn()
    const postNewProject = jest.fn()
    const actionToDispatch = postNewProject(mockUrl, mockBody)
    const mappedProps = mapDispatchToProps(mockDispatch)

    mappedProps.postNewProject(mockUrl, mockBody)

    expect(mockDispatch).toHaveBeenCalled(actionToDispatch)
  })
  
})