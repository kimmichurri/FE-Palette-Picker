import { Palette, mapStateToProps, mapDispatchToProps } from './Palette';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('../../actions')

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

    beforeEach(() => {
      mockStoreColors = jest.fn().mockImplementation(() => Promise.resolve({mockCurrentColors}))
      wrapper = shallow(
        <Palette
          currentColors={mockCurrentColors}
          projects={mockProjects}
          storeColors={mockStoreColors} 
        />
      )
    })

    it('should match the snapshot', () => {
      expect(wrapper.debug()).toMatchSnapshot()
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
  });

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
  })
})