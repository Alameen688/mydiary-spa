import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import LandingPage from '../../src/component/presentational/LandingPage.jsx';

describe('LandingPage', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LandingPage/>);
    expect(wrapper.find(Link)).toHaveLength(3);
  });
});
