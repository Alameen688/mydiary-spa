import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../../src/component/presentational/Login.jsx';

describe('Login', () => {
  it('should render without crashing', () => {
    const props = {
      email: 'testerwew@ef3rf.co',
      password: 'testing12ew',
      onClick: jest.fn(),
      onChange: jest.fn(),
      errors: [
        'Credentials do not macth any record'
      ]
    };
    const wrapper = shallow(<Login { ...props }/>);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('div#error-box')).toBeTruthy();
  });
});
