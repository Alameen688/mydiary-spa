import Aux from '../../../src/component/HOC/Aux.jsx';

describe('Aux', () => {
  const props = {
    children: {

    }
  };
  it('should return props', () => {
    const result = Aux(props);
    expect(result).toEqual(props.children);
  });
});
