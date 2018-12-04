import React from 'react';
import { shallow } from 'enzyme';
import HeaderView from '../../../src/component/presentational/Header.jsx';

describe('Header', () => {
  const props = {
    children: {},
    isLoggedIn: false,
    logout: jest.fn()
  };
  it('should render HeaderView without crashing', () => {
    const wrapper = shallow(<HeaderView {...props } />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
