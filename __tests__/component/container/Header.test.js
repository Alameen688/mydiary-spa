import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../src/component/container/Header';
import HeaderView from '../../../src/component/presentational/Header.jsx';

describe('Header', () => {
  const props = {
    children: {},
    isLoggedIn: false,
    logout: jest.fn()
  };
  it('should render HeaderContainer without crashing', () => {
    const wrapper = shallow(<Header { ...props } />);
    expect(wrapper.find(HeaderView)).toHaveLength(1);
  });
});
