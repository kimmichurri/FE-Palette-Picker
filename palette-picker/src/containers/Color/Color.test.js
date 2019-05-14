import Color from './Color';
import React from 'react';
import { shallow } from 'enzyme';

describe('Color Container', () => {
  const mockColor = '#F1C231'
  const mockLocked = false;
  const mockIndex = 0
  const mockHandleToggle = jest.fn()

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <Color 
        color={mockColor}
        locked={mockLocked}
        index={mockIndex}
        handleToggle={mockHandleToggle}
      />
    )

    expect(wrapper.debug()).toMatchSnapshot()
  })
})
