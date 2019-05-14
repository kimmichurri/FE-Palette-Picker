import { Projects, mapStateToProps, mapDispatchToProps } from './Projects';
import React from 'react';
import { shallow } from 'enzyme';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';
jest.mock('../../utils/fetchOptionsCreator');

describe('Projects Container', () => {
  describe('Projects', () => {
    let wrapper;
    const mockState = {
      project_name: '',
      project_id: 0
    }
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
    let mockPostNewProject;

    beforeEach(() => {
      mockPostNewProject = jest.fn()
      wrapper = shallow(
        <Projects 
          projects={mockProjects}
          postNewProject={mockPostNewProject}
        />
      )
    })

    it('should match the snapshot', () => {
      expect(wrapper.debug()).toMatchSnapshot()
    })

    it('should have proper default state', () => {
        expect(wrapper.state()).toEqual(mockState)
    })

    it('should set state with a project name', () => {
      const mockEvent = { target: { name : "project_name", value: "MyNewProject" } }
      
      wrapper.instance().updateProjectName(mockEvent)

      expect(wrapper.state()).toEqual({
        project_name: "MyNewProject",
        project_id: 0
      })
    })

    it('should call fetchOptionsCreator with a method and body', async () => {
      const mockEvent = { preventDefault: jest.fn() }
      const projectName = "Unique Project Name"

      wrapper.setState({
        project_name: projectName
      })

      wrapper.instance().addNewProject(mockEvent)

      expect(fetchOptionsCreator).toHaveBeenCalledWith('POST', { project_name: projectName} )
    })

    it.skip('should call postNewProject with options and projectName as arguments', () => {
      const mockEvent = { preventDefault: jest.fn() }
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