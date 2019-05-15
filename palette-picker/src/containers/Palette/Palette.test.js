import { Palette, mapStateToProps, mapDispatchToProps } from './Palette';
import React from 'react';
import { shallow } from 'enzyme';
import { fetchOptionsCreator } from '../../utils/fetchOptionsCreator';

jest.mock('../../actions')
jest.mock('../../thunks/postNewPalette')

describe('Palette Container', () => {
  describe('Palette', () => {
    let wrapper;
    const mockCurrentColors = [
      {"color": "#f82e41", "locked": true}, 
      {"color": "#2261cd", "locked": true}, 
      {"color": "#271de3", "locked": true}, 
      {"color": "#1563ec", "locked": true}, 
      {"color": "#9e0246", "locked": true}
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
    let mockStoreColors
    let mockPostNewPalette
    const mockState = {
      palette_name: '',
      project_id: 0,
      color_1: '',
      color_2: '',
      color_3: '',
      color_4: '',
      color_5: ''
    }

    const mockPalette = {
      palette_name: 'Summer colors',
      project_id: 0,
      color_1: '#f82e41',
      color_2: '#2261cd',
      color_3: '#271de3',
      color_4: '#f82e41',
      color_5: '#271de3'
    }

    beforeEach(() => {
      mockStoreColors = jest.fn().mockImplementation(() => Promise.resolve({mockCurrentColors}))
      mockPostNewPalette = jest.fn().mockImplementation(() => Promise.resolve({mockPalette}))
      wrapper = shallow(
        <Palette
          currentColors={mockCurrentColors}
          projects={mockProjects}
          storeColors={mockStoreColors} 
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

    it('should call props function storeColors with updatedColors array', () => {
      const mockEvent = { target: { id : 10 }}
      const mockUpdatedColors = [
        {"color": "#f82e41", "locked": true}, 
        {"color": "#2261cd", "locked": true}, 
        {"color": "#271de3", "locked": true}, 
        {"color": "#1563ec", "locked": true}, 
        {"color": "#9e0246", "locked": true}
      ]
      wrapper.instance().handleToggle(mockEvent)

      expect(wrapper.instance().props.storeColors).toHaveBeenCalledWith(mockUpdatedColors)
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
      const options = await fetchOptionsCreator('POST', body)

      wrapper.instance().addNewPalette()
      expect(wrapper.instance().props.postNewPalette).toHaveBeenCalledWith(options, body)
    })

    it('should set state with a value', () => {
      const mockEvent = { target: { name : "palette_name", value: "MyNewPalette" } }
      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state('palette_name')).toEqual("MyNewPalette")
    })
  })

  describe('mapStateToProps', () => {
    it('should return an object with a currentColors array', () => {
      const mockState = {
        currentColors: [
          {"color": "#f82e41", "locked": true}, 
          {"color": "#2261cd", "locked": true}
        ],
        fakeState: "Not real state to return"
      }
      const expected = {
        currentColors: [
          {"color": "#f82e41", "locked": true}, 
          {"color": "#2261cd", "locked": true}
        ]
      }

      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
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