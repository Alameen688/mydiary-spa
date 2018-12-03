import React from 'react';
import { shallow } from 'enzyme';
import { GuestRoute } from '../../../src/component/HOC/GuestRoute.jsx';
import LoginComponent from '../../../src/component/container/Login';

describe('GuestRoute', () => {
  it('should render Component when user is not logged in', () => {
    const wrapper = shallow(
        <GuestRoute
          component={LoginComponent}
          isLoggedIn={false}
        />
    );
    wrapper.prop('render')({});
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should not render Component when user is logged in', () => {
    const wrapper = shallow(
        <GuestRoute
          component={LoginComponent}
          isLoggedIn={true}
        />
    );
    wrapper.prop('render')({});
    expect(wrapper.exists()).toBeTruthy();
  });
});
