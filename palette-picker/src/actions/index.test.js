import * as actions from './index';

describe('actions', () => {

  it('should return a type of HAS_ERROR with a message', () => {
    const message = 'Something went wrong'
    const expected = {
      type: 'HAS_ERROR',
      message
    }

    const result = actions.hasError(message)

    expect(result).toEqual(expected)
  })

  it('should return a type of STORE_PROJECTS with an array of projects', () => {
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
    const expected = {
      type: 'STORE_PROJECTS',
      projects: mockProjects
    }

    const result = actions.storeProjects(mockProjects)

    expect(result).toEqual(expected)
  })

  it('should return a type of STORE_COLORS with an array of color objects', () => {
    const mockColors = [
      { color: '#37761B', locked: false }, { color: '#990000', locked: false }
    ]
    const expected = {
      type: 'STORE_COLORS',
      colors: mockColors
    }

    const result = actions.storeColors(mockColors)

    expect(result).toEqual(expected)
  })

  it('should return a type of ADD_PROJECT with the new projects', () => {
    const mockNewProject = { project_name: "Jon's project" }
    const expected = {
      type: 'ADD_PROJECT',
      newProject: mockNewProject
    }
    
    const result = actions.addProject(mockNewProject)

    expect(result).toEqual(expected)
  })

  it('should return a type of ADD_PALETTE with a new palette', () => {
    const mockNewPalette = {
      palette_name: "faefae",
      palette_id: 68,
      project_id: 1,
      color_1: "#605976",
      color_2: "#3241f2",
      color_3: "#dc677",
      color_4: "#1c1eb5",
      color_5: "#c54e8b"
    }
    const expected = {
      type: 'ADD_PALETTE',
      newPalette: mockNewPalette
    }

    const result = actions.addPalette(mockNewPalette)

    expect(result).toEqual(expected)
  })

  it('should return a type of STORE_PALETTES with an array of palettes', () => {
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
    const expected = {
    type: 'STORE_PALETTES',
    palettes: mockPalettes
    }

    const result = actions.storePalettes(mockPalettes)

    expect(result).toEqual(expected)
  })

});