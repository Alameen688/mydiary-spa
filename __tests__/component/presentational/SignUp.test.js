import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../../../src/component/presentational/SignUp.jsx';

describe('LandingPage', () => {
  it('should render without crashing', () => {
    const props = {
      email: 'tester@ef3rf.co',
      fullname: 'testing tester',
      password: 'testing12',
      confirmPassword: 'testing12',
      onClick: jest.fn(),
      onChange: jest.fn(),
      errors: [
        'Password must be at least 8 characters'
      ]
    };
    const wrapper = shallow(<SignUp { ...props }/>);
    expect(wrapper.exists()).toBeTruthy();
  });
});
