import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App.jsx';
// TO DO: Rewrite test to support new hooks implementation
describe('App', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.exists()).toBe(true);
  });
});
