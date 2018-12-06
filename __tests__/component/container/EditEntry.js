import React from 'react';
import { shallow } from 'enzyme';
import { EditEntry } from '../../../src/component/container/EditEntry';
import EditEntryForm from '../../../src/component/presentational/EditEntry.jsx';

describe('EditEntry ', () => {
  const errors = [
    'Title cannot be empty'
  ];
  let props;
  beforeEach(() => {
    props = {
      errors: [],
      match: {
        params: {
          id: 1
        }
      },
      history: {
        push: jest.fn()
      },
      getEntry: jest.fn(),
      entryToEdit: {
        id: 1,
        title: 'The title of the entry',
        content: 'The content of the entry to edit'
      },
      showUpdateError: jest.fn(),
      clearUpdateError: jest.fn(),
      updateEntry: jest.fn(),
      clearUpdateResponse: jest.fn(),
    };
  });

  it('should render update page without crashing', () => {
    const wrapper = shallow(<EditEntry { ...props } />);
    expect(wrapper.find(EditEntryForm)).toHaveLength(1);
  });

  it('should handle change events', () => {
    const changeHandlerSpy = jest.spyOn(EditEntry.prototype, 'changeHandler');
    const event = {
      target: {
        name: 'title',
        value: 'A good thing to do'
      }
    };
    const wrapper = shallow(<EditEntry { ...props } />);
    wrapper.instance().changeHandler(event);
    expect(wrapper.state('title')).toEqual(event.target.value);
    expect(changeHandlerSpy).toHaveBeenCalled();
    changeHandlerSpy.mockRestore();
  });

  it('should handle focus events and clear error if error exists', () => {
    const focusHandlerSpy = jest.spyOn(EditEntry.prototype, 'focusHandler');
    const event = {
      target: {
        name: 'content',
        value: 'testing'
      }
    };
    props.errors = errors;
    const wrapper = shallow(<EditEntry { ...props } />);
    wrapper.instance().focusHandler(event);
    expect(focusHandlerSpy).toHaveBeenCalled();
    expect(props.clearUpdateError).toHaveBeenCalled();
    focusHandlerSpy.mockRestore();
  });

  it('should handle click events and show error if error exists', () => {
    const clickHandlerSpy = jest.spyOn(EditEntry.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<EditEntry { ...props } />);
    wrapper.setState({
      title: 'An issue',
    });
    wrapper.instance().clickHandler(event);
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.showUpdateError).toHaveBeenCalled();
    expect(props.updateEntry).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });

  it('should handle click events and call update method', () => {
    props.updateEntry = jest.fn().mockImplementation(() => Promise.resolve(201));
    const clickHandlerSpy = jest.spyOn(EditEntry.prototype, 'clickHandler');
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = shallow(<EditEntry { ...props } />);
    wrapper.setState({
      title: 'Final write up for the week',
      content: 'testing testing it has been nice all through',
    });
    wrapper.instance().clickHandler(event);
    expect(wrapper.state('title')).toEqual('Final write up for the week');
    expect(clickHandlerSpy).toHaveBeenCalled();
    expect(props.updateEntry).toHaveBeenCalled();
    expect(props.showUpdateError).not.toHaveBeenCalled();
    clickHandlerSpy.mockRestore();
  });
});
