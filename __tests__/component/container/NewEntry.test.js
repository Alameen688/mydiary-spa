import React from 'react';
import { shallow } from 'enzyme';
import { NewEntry } from '../../../src/component/container/NewEntry';
import NewEntryForm from '../../../src/component/presentational/NewEntry.jsx';

describe('NewEntry ', () => {
  const errors = [
    'Title cannot be empty'
  ];
  let props;
  beforeEach(() => {
    props = {
      errors: [],
      history: {
        push: jest.fn()
      },
      showCreateError: jest.fn(),
      clearCreateError: jest.fn(),
      createEntry: jest.fn(),
      clearCreateResponse: jest.fn(),
    };
  });

  it('should render create page without crashing', () => {
    const wrapper = shallow(<NewEntry { ...props } />);
    expect(wrapper.find(NewEntryForm)).toHaveLength(1);
  });

  it('should handle change events', () => {
    const changeHandlerSpy = jest.spyOn(NewEntry.prototype, 'changeHandler');
    const event = {
      target: {
        name: 'title',
        value: 'A good thing to do'
      }
    };
    const wrapper = shallow(<NewEntry { ...props } />);
    wrapper.instance().changeHandler(event);
    expect(wrapper.state('title')).toEqual(event.target.value);
    expect(changeHandlerSpy).toHaveBeenCalled();
    changeHandlerSpy.mockRestore();
  });

  it('should handle focus events and clear error if error exists', () => {
    const focusHandlerSpy = jest.spyOn(NewEntry.prototype, 'focusHandler');
    const event = {
      target: {
        name: 'content',
        value: 'testing'
      }
    };
    props.errors = errors;
    const wrapper = shallow(<NewEntry { ...props } />);
    wrapper.instance().focusHandler(event);
    expect(focusHandlerSpy).toHaveBeenCalled();
    expect(props.clearCreateError).toHaveBeenCalled();
    focusHandlerSpy.mockRestore();
  });

  it('should handle click events and show error if error exists', () => {
    const clickHandlerSpy = jest.spyOn(NewEntry.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<NewEntry { ...props } />);
    wrapper.setState({
      title: 'An issue',
    });
    wrapper.instance().clickHandler(event);
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.showCreateError).toHaveBeenCalled();
    expect(props.createEntry).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });

  it('should handle click events and call create method', () => {
    props.createEntry = jest.fn().mockImplementation(() => Promise.resolve(201));
    const clickHandlerSpy = jest.spyOn(NewEntry.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<NewEntry { ...props } />);
    wrapper.setState({
      title: 'Final write up for the week',
      content: 'testing testing it has been nice all through',
    });
    wrapper.instance().clickHandler(event);
    expect(wrapper.state('title')).toEqual('Final write up for the week');
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.createEntry).toHaveBeenCalled();
    expect(props.showCreateError).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });
});
