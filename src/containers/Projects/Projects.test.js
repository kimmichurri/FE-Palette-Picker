import { Projects, mapStateToProps, mapDispatchToProps } from './Projects';
import React from 'react';
import { shallow } from 'enzyme';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';

jest.mock('../../utils/fetchOptionsCreator');
jest.mock('../../thunks/postNewPalette');

describe('Projects Container', () => {
  describe('Projects', () => {
    let wrapper

    const mockState = {
      project_name: '',
      project_id: 0,
      palette_name: '',
      color_1: '',
      color_2: '',
      color_3: '',
      color_4: '',
      color_5: ''
      }

    const mockMessage = "Something went wrong"
    const mockCurrentColors = [
      { color: "#BE10E8",
        locked: false
      },
      { color: "#3241f2",
        locked: true
      },
      { color: "#BE10E8",
        locked: false
      },
      { color: "#605976",
        locked: false
      },
      { color: "#1c1eb5",
        locked: false
      }
    ]
    
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
    const mockPalettes = [
      {
          palette_name: "one",
          palette_id: 68,
          project_id: 1,
          color_1: "#605976",
          color_2: "#3241f2",
          color_3: "#dc677",
          color_4: "#1c1eb5",
          color_5: "#c54e8b"
      },
      {
        palette_name: "two",
        palette_id: 68,
        project_id: 1,
        color_1: "#c54e8b",
        color_2: "#3241f2",
        color_3: "#dc677",
        color_4: "#1c1eb5",
        color_5: "#605976"
      }]

      const mockPalette = {
        palette_name: 'Summer colors',
        project_id: 0,
        color_1: '#f82e41',
        color_2: '#2261cd',
        color_3: '#271de3',
        color_4: '#f82e41',
        color_5: '#271de3'
      }
    let mockPostNewPalette
    let mockPostNewProject
    let mockStorePalettes
    let mockDeletePalette
    let mockStoreProjects
    let mockDeleteProject

    beforeEach(() => {
      mockPostNewProject = jest.fn()
      mockStorePalettes = jest.fn()
      mockDeletePalette = jest.fn()
      mockStoreProjects = jest.fn()
      mockDeleteProject = jest.fn()
      mockPostNewPalette = jest.fn().mockImplementation(() => Promise.resolve({mockPalette}))
      wrapper = shallow(
        <Projects 
          projects={mockProjects}
          palettes={mockPalettes}
          message={mockMessage}
          currentColors={mockCurrentColors}
          postNewProject={mockPostNewProject}
          storePalettes={mockStorePalettes}
          deletePalette={mockDeletePalette}
          storeProjects={mockStoreProjects}
          deleteProject={mockDeleteProject}
          postNewPalette={mockPostNewPalette}
        />
      )
    })

    it('should match the snapshot', () => {
      expect(wrapper.debug()).toMatchSnapshot()
    })

    it('should have proper default state', () => {
      expect(wrapper.state()).toEqual(mockState)
    })

    it('should set state on handleChange', () => {
      const mockEvent = { target: { name : "project_name", value: "MyNewProject" } }
      
      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state()).toEqual({
        project_name: "MyNewProject",
        project_id: 0,
        palette_name: '',
        color_1: '',
        color_2: '',
        color_3: '',
        color_4: '',
        color_5: ''
      })
    })

    it.skip('should call props function postNewPalette with options and body', async () => {
      wrapper.setState({
        palette_name: 'Summer colors',
        project_id: 0,
        color_1: '#f82e41',
        color_2: '#2261cd',
        color_3: '#271de3',
        color_4: '#f82e41',
        color_5: '#271de3'
      })
      const body = wrapper.state()
      // const options = await fetchOptionsCreator('POST', body)

      wrapper.instance().addNewPalette()
      expect(wrapper.instance().props.postNewPalette).toHaveBeenCalledWith(options, body)
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
    
    it('should set state with a value', () => {
      const mockEvent = { target: { name : "palette_name", value: "MyNewPalette" } }
      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('palette_name')).toEqual("MyNewPalette")
    })

    it.skip('should call postNewProject with options and projectName as arguments', async () => {
      const mockEvent = { preventDefault: jest.fn() }
      const mockOptions = ('POST', { project_name: "Unique Project Name" } )

      wrapper.instance().addNewProject(mockEvent)

      expect(wrapper.instance().props.postNewProject).toHaveBeenCalledWith(mockOptions, "Unique Project Name")
    })

  })

  describe('mapStateToProps', () => {
    it('should return the expected props to state', () => {

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
        palettes: [
          {
              palette_name: "one",
              palette_id: 68,
              project_id: 1,
              color_1: "#605976",
              color_2: "#3241f2",
              color_3: "#dc677",
              color_4: "#1c1eb5",
              color_5: "#c54e8b"
          },
          {
            palette_name: "two",
            palette_id: 68,
            project_id: 1,
            color_1: "#c54e8b",
            color_2: "#3241f2",
            color_3: "#dc677",
            color_4: "#1c1eb5",
            color_5: "#605976"
          }],
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
        palettes: [
          {
              palette_name: "one",
              palette_id: 68,
              project_id: 1,
              color_1: "#605976",
              color_2: "#3241f2",
              color_3: "#dc677",
              color_4: "#1c1eb5",
              color_5: "#c54e8b"
          },
          {
            palette_name: "two",
            palette_id: 68,
            project_id: 1,
            color_1: "#c54e8b",
            color_2: "#3241f2",
            color_3: "#dc677",
            color_4: "#1c1eb5",
            color_5: "#605976"
          }]
      }
  
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should dispatch postNewProject with a url and body', () => {
      const mockUrl = 'www.projects.com'
      const mockBody = { project_name: "Harold's Project" }
      const mockDispatch = jest.fn()
      const postNewProject = jest.fn()
      const actionToDispatch = postNewProject(mockUrl, mockBody)
      const mappedProps = mapDispatchToProps(mockDispatch)
  
      mappedProps.postNewProject(mockUrl, mockBody)
  
      expect(mockDispatch).toHaveBeenCalled(actionToDispatch)
    })

    it('should dispatch storePalettes with updated palettes', () => {
      const mockDispatch = jest.fn()
      const storePalettes = jest.fn()
      const mockUpdatedPalettes = [
        {
          palette_name: "one",
          palette_id: 68,
          project_id: 1,
          color_1: "#605976",
          color_2: "#3241f2",
          color_3: "#dc677",
          color_4: "#1c1eb5",
          color_5: "#c54e8b"
        },
        {
          palette_name: "two",
          palette_id: 68,
          project_id: 1,
          color_1: "#c54e8b",
          color_2: "#3241f2",
          color_3: "#dc677",
          color_4: "#1c1eb5",
          color_5: "#605976"
        }]
      const actionToDispatch = storePalettes(mockUpdatedPalettes)
      const mappedProps = mapDispatchToProps(mockDispatch)
      
      mappedProps.storePalettes(mockUpdatedPalettes)

      expect(mockDispatch).toHaveBeenCalled(actionToDispatch)      
      })

      it('should dispatch deletePalette with an id', () => {
        const mockPaletteId = 187
        const mockDispatch = jest.fn()
        const deletePalette = jest.fn()
        const actionToDispatch = deletePalette(mockPaletteId)
        const mappedProps = mapDispatchToProps(mockDispatch)

        mappedProps.deletePalette(mockPaletteId)

        expect(mockDispatch).toHaveBeenCalled(actionToDispatch)      
      })

      it('should dispatch storeProjects with udpdated projects', () => {
        const mockUpdatedProjects = [
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
        const mockDispatch = jest.fn()
        const storeProjects = jest.fn()
        const actionToDispatch = storeProjects(mockUpdatedProjects)
        const mappedProps = mapDispatchToProps(mockDispatch)

        mappedProps.storeProjects(mockUpdatedProjects)

        expect(mockDispatch).toHaveBeenCalled(actionToDispatch)      
      })

      it('should dispatch deleteProject with an id', () => {
        const mockProjectId = 817
        const mockDispatch = jest.fn()
        const deleteProject = jest.fn()
        const actionToDispatch = deleteProject(mockProjectId)
        const mappedProps = mapDispatchToProps(mockDispatch)

        mappedProps.deleteProject(mockProjectId)

        expect(mockDispatch).toHaveBeenCalled(actionToDispatch)
      })

      it('should dispatch postNewPalette with options and body', () => {
        const mockBody = {
          palette_name: 'Summer colors',
          project_id: 0,
          color_1: '#f82e41',
          color_2: '#2261cd',
          color_3: '#271de3',
          color_4: '#f82e41',
          color_5: '#271de3'
        }
        const options = fetchOptionsCreator('POST', mockBody)
        const mockDispatch = jest.fn()
        const postNewPalette  = jest.fn()
        const actionToDispatch = postNewPalette(options, mockBody)
        const mappedProps = mapDispatchToProps(mockDispatch)
  
        mappedProps.postNewPalette(options, mockBody)
  
        expect(mockDispatch).toHaveBeenCalled(actionToDispatch)
      })
  })
  
})