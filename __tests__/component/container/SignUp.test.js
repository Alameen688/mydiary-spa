import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../../src/component/container/SignUp';
import HeaderContainer from '../../../src/component/container/Header';

describe('SignUp ', () => {
  const errors = [
    'Fullname must be at least 6 characters',
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
      signUp: jest.fn(),
      showError: jest.fn(),
      clearError: jest.fn(),
    };
  });

  it('should signup page without crashing', () => {
    const wrapper = shallow(<SignUp { ...props } />);
    expect(wrapper.find(HeaderContainer)).toHaveLength(1);
  });

  it('should handle change events', () => {
    const changeHandlerSpy = jest.spyOn(SignUp.prototype, 'changeHandler');
    const event = {
      target: {
        name: 'email',
        value: 'tester@rgtyga.com'
      }
    };
    const wrapper = shallow(<SignUp { ...props } />);
    wrapper.instance().changeHandler(event);
    expect(wrapper.state('email')).toEqual(event.target.value);
    expect(changeHandlerSpy).toHaveBeenCalled();
    changeHandlerSpy.mockRestore();
  });

  it('should handle change events and clear error if error exists', () => {
    const changeHandlerSpy = jest.spyOn(SignUp.prototype, 'changeHandler');
    const event = {
      target: {
        name: 'password',
        value: 'tester'
      }
    };
    props.errors = errors;
    const wrapper = shallow(<SignUp { ...props } />);
    wrapper.instance().changeHandler(event);
    expect(wrapper.state('password')).toEqual(event.target.value);
    expect(changeHandlerSpy).toHaveBeenCalled();
    expect(props.clearError).toHaveBeenCalled();
    changeHandlerSpy.mockRestore();
  });

  it('should handle click events and show error if error exists', () => {
    const clickHandlerSpy = jest.spyOn(SignUp.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<SignUp { ...props } />);
    wrapper.setState({
      email: 'tester@egrdfs.com',
      fullname: '',
      password: 'testing',
      confirmPassword: 'testing'
    });
    wrapper.instance().clickHandler(event);
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.showError).toHaveBeenCalled();
    expect(props.signUp).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });

  it('should handle click events and call signup method', () => {
    props.signUp = jest.fn().mockImplementation(() => Promise.resolve(201));
    const clickHandlerSpy = jest.spyOn(SignUp.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<SignUp { ...props } />);
    wrapper.setState({
      email: 'tester@egrdfs.com',
      fullname: 'beta tester',
      password: 'testingtesting',
      confirmPassword: 'testingtesting'
    });
    wrapper.instance().clickHandler(event);
    expect(wrapper.state('email')).toEqual('tester@egrdfs.com');
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.signUp).toHaveBeenCalled();
    expect(props.showError).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });
});
