import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/component/container/Login';
import LoginView from '../../../src/component/presentational/Login.jsx';

describe('Login ', () => {
  const errors = [
    'Password must be at least 8 characters'
  ];
  let props;
  beforeEach(() => {
    props = {
      loading: false,
      errors: [],
      history: {
        push: jest.fn()
      },
      login: jest.fn(),
      showError: jest.fn(),
      clearError: jest.fn(),
    };
  });

  it('should render login page without crashing', () => {
    const wrapper = shallow(<Login { ...props } />);
    expect(wrapper.find(LoginView)).toHaveLength(1);
  });

  it('should handle change events', () => {
    const changeHandlerSpy = jest.spyOn(Login.prototype, 'changeHandler');
    const event = {
      target: {
        name: 'email',
        value: 'tester@rgtyga.com'
      }
    };
    const wrapper = shallow(<Login { ...props } />);
    wrapper.instance().changeHandler(event);
    expect(wrapper.state('email')).toEqual(event.target.value);
    expect(changeHandlerSpy).toHaveBeenCalled();
    changeHandlerSpy.mockRestore();
  });

  it('should handle change events and clear error if error exists', () => {
    const changeHandlerSpy = jest.spyOn(Login.prototype, 'changeHandler');
    const event = {
      target: {
        name: 'password',
        value: 'tester'
      }
    };
    props.errors = errors;
    const wrapper = shallow(<Login { ...props } />);
    wrapper.instance().changeHandler(event);
    expect(wrapper.state('password')).toEqual(event.target.value);
    expect(changeHandlerSpy).toHaveBeenCalled();
    expect(props.clearError).toHaveBeenCalled();
    changeHandlerSpy.mockRestore();
  });

  it('should handle click events and show error if error exists', () => {
    const clickHandlerSpy = jest.spyOn(Login.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<Login { ...props } />);
    wrapper.setState({
      email: 'tester@egrdfs.com',
    });
    wrapper.instance().clickHandler(event);
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.showError).toHaveBeenCalled();
    expect(props.login).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });

  it('should handle click events and call login method', () => {
    props.login = jest.fn().mockImplementation(() => Promise.resolve({
      response: {
        token: 'jhregtdyfuio'
      }
    }));
    const clickHandlerSpy = jest.spyOn(Login.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<Login { ...props } />);
    wrapper.setState({
      email: 'tester@egrdfs.com',
      password: 'testingtesting',
    });
    wrapper.instance().clickHandler(event);
    expect(wrapper.state('email')).toEqual('tester@egrdfs.com');
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.login).toHaveBeenCalled();
    expect(props.showError).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });
});
